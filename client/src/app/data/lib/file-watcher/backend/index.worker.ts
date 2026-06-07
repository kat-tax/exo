/// <reference lib="webworker" />

import {createIdFromString} from '@evolu/common';
// FIXME: vite build needs these to be relative for some reason
import {DeviceId} from '../../../../../app/data/types';
import {FileType} from '../../../../../media/file/types';
import {getRenderer} from '../../../../../media/file/utils/render';
import {getPathInfo} from '../../../../../media/dir/utils/path';
import {getFileHash} from '../utils/identify';
import * as gen from '../utils/generate';
import cfg from 'config';

import type {
  WorkerMessage,
  WorkerResponse,
  SnapshotData,
  FileTuple,
  PathTuple,
} from '../types';

interface ThumbQueueItem {
  fileId: string;
  handle: FileSystemFileHandle;
  size: number;
  type: FileType;
}

class FileWatcherWorker {
  private rootHandle: FileSystemDirectoryHandle | null = null;
  private deviceId: DeviceId | null = null;
  private observer: FileSystemObserver | null = null;
  private snapshot: SnapshotData = {paths: {}, files: {}};
  private pendingPaths = new Set<string>();
  private pendingPathsTimer: number | null = null;
  private thumbQueue: ThumbQueueItem[] = [];
  private thumbQueueTimer: number | null = null;

  private readonly IGNORED_FOLDERS = [`.tmp`, `.${cfg.APP_NAME}-${cfg.STORE_VERSION}`];
  private readonly PENDING_PATHS_DELAY = 200;
  private readonly THUMB_QUEUE_INTERVAL = 1000;
  private readonly THUMB_BATCH_SIZE_BYTES = 50 * 1024 * 1024;

  async init(deviceId: DeviceId): Promise<void> {
    this.rootHandle = await navigator.storage.getDirectory();
    this.deviceId = deviceId;
    try {
      await this.scanDirectory(this.rootHandle, null, '');
      this.send({type: 'ready', snapshot: this.snapshot});
      this.snapshot = {paths: {}, files: {}};
      this.startObserver();
      this.startThumbnailProcessor();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.send({type: 'error', message});
    }
  }

  send(message: WorkerResponse): void {
    self.postMessage(message);
  }

  stop(): void {
    this.observer?.disconnect();
    this.observer = null;
    this.clearPendingPaths();
    this.stopThumbnailProcessor();
  }

  private clearPendingPaths(): void {
    if (this.pendingPathsTimer !== null) {
      self.clearTimeout(this.pendingPathsTimer);
      this.pendingPathsTimer = null;
    }
    this.pendingPaths.clear();
  }

  private enqueuePathChange(path: string): void {
    this.pendingPaths.add(path);
    if (this.pendingPathsTimer !== null) return;
    this.pendingPathsTimer = self.setTimeout(() => {
      this.pendingPathsTimer = null;
      if (!this.pendingPaths.size) return;
      this.send({type: 'paths', paths: Array.from(this.pendingPaths)});
      this.pendingPaths.clear();
    }, this.PENDING_PATHS_DELAY);
  }

  private async scanDirectory(
    dirHandle: FileSystemDirectoryHandle,
    parentId: string | null,
    currentPath: string,
  ): Promise<void> {
    const isRoot = dirHandle === this.rootHandle;
    const dirId = isRoot ? null : this.createPathId(currentPath);
    // Add directory path to snapshot
    if (!isRoot && dirId) {
      this.snapshot.paths[dirId] = [dirHandle.name, parentId, null];
    }
    // Scan directory contents
    for await (const entry of dirHandle.values()) {
      // Skip ignored directories
      if (entry.kind === 'directory' && this.IGNORED_FOLDERS.includes(entry.name))
        continue;
      const entryPath = isRoot ? entry.name : `${currentPath}/${entry.name}`;
      // Process file data
      if (entry.kind === 'file') {
        const {fileId, snapshot} = await this.processFile(entry as FileSystemFileHandle);
        // Skip zero-byte files
        if (fileId === '')
          continue;
        // Add file path to snapshot
        const pathId = this.createPathId(entryPath);
        this.snapshot.paths[pathId] = [entry.name, dirId, fileId];
        // Add file data to snapshot
        if (!this.snapshot.files[fileId])
          this.snapshot.files[fileId] = snapshot;
      // Recursively scan subdirectories
      } else if (entry.kind === 'directory') {
        await this.scanDirectory(entry as FileSystemDirectoryHandle, dirId, entryPath);
      }
    }
  }

  private async processFile(handle: FileSystemFileHandle, skipThumbQueue = false): Promise<{fileId: string, snapshot: FileTuple}> {
    const file = await handle.getFile();
    if (file.size === 0) return {fileId: '', snapshot: [0, FileType.Binary]};
    const name = handle.name.split('/').at(-1) ?? handle.name;
    const fileId = await this.createFileId(handle);
    const pathInfo = getPathInfo(name);
    const [fileType] = getRenderer(pathInfo.ext);
    // Queue for thumbnail generation if applicable
    if (!skipThumbQueue && (fileType === FileType.Image || fileType === FileType.Video)) {
      this.thumbQueue.push({fileId, handle, size: file.size, type: fileType});
    }
    return {
      fileId,
      snapshot: [
        file.size,
        fileType,
      ],
    };
  }

  private async startObserver() {
    if (!this.rootHandle) return;
    this.observer = new FileSystemObserver(async (records) => {
      for (const record of records) {
        await this.handleChangeRecord(record);
      }
    });
    await this.observer.observe(this.rootHandle, {recursive: true});
  }

  private async handleChangeRecord(record: FileSystemChangeRecord) {
    try {
      // Ignore root folder changes
      if (record.relativePathComponents.length === 0) return;
      // Ignore changes in ignored folders (check path components first)
      if (this.IGNORED_FOLDERS.includes(record.relativePathComponents[0])) return;
      const {pathId, parentId, name, fullPath} = await this.getRecordPath(record);
      // For ignored directory operations (when changedHandle is available)
      if (record.changedHandle?.kind === 'directory' && this.IGNORED_FOLDERS.includes(name)) return;
      this.enqueuePathChange(fullPath);
      switch (record.type) {
        case 'appeared':
          if (record.changedHandle?.kind === 'file') {
            await this.handleFileChange(record.changedHandle as FileSystemFileHandle, pathId, name, parentId, 'appeared');
          } else if (record.changedHandle?.kind === 'directory') {
            const path: PathTuple = [name, parentId, null];
            this.send({type: 'delta', data: {type: 'appeared', pathId, path}});
          }
          break;
        case 'disappeared':
          this.send({type: 'delta', data: {type: 'disappeared', pathId}});
          break;
        case 'modified':
          if (record.changedHandle?.kind === 'file') {
            await this.handleFileChange(record.changedHandle as FileSystemFileHandle, pathId, name, parentId, 'modified');
          }
          break;
        case 'moved':
          const {pathId: oldPathId, fullPath: oldFullPath} = await this.getRecordPath(
            record,
            record.relativePathMovedFrom ? [...record.relativePathMovedFrom] : undefined,
          );
          this.enqueuePathChange(oldFullPath);
          let path: PathTuple;
          let file: FileTuple | undefined;
          if (record.changedHandle?.kind === 'file') {
            const fileHandle = record.changedHandle as FileSystemFileHandle;
            const {fileId, snapshot} = await this.processFile(fileHandle);
            path = [name, parentId, fileId];
            file = snapshot;
          } else {
            path = [name, parentId, null];
          }
          this.send({type: 'delta', data: {type: 'moved', pathId, path, movedFrom: oldPathId, file}});
          break;
        case 'errored':
          this.observer?.unobserve(record.root);
          this.send({type: 'error', message: 'File system observer error'});
          break;
      }
    } catch (error) {
      console.error('[fs-watcher] error handling change record:', error);
    }
  }

  private async getRecordPath(
    record: FileSystemChangeRecord,
    pathComponents?: string[],
  ): Promise<{
    pathId: string,
    parentId: string | null,
    name: string,
    fullPath: string,
  }> {
    const components = pathComponents || record.relativePathComponents;
    const fullPath = components.join('/');
    const pathId = this.createPathId(fullPath);
    const parentPath = components.slice(0, -1).join('/');
    const parentId = parentPath ? this.createPathId(parentPath) : null;
    const name = components[components.length - 1];
    return {pathId, parentId, name, fullPath};
  }

  private async handleFileChange(
    fileHandle: FileSystemFileHandle,
    pathId: string,
    name: string,
    parentId: string | null,
    changeType: 'appeared' | 'modified',
  ): Promise<void> {
    const file = await fileHandle.getFile();
    if (file.size === 0) return;
    const {fileId, snapshot} = await this.processFile(fileHandle);
    const path: PathTuple = [name, parentId, fileId];
    this.send({
      type: 'delta',
      data: {
        type: changeType,
        pathId,
        path,
        file: snapshot,
      },
    });
  }

  private async createFileId(fileHandle: FileSystemFileHandle): Promise<string> {
    return createIdFromString(await getFileHash(fileHandle));
  }

  private createPathId(path: string): string {
    return createIdFromString(`${this.deviceId}/${path}`);
  }

  private startThumbnailProcessor(): void {
    if (this.thumbQueueTimer !== null) return;
    this.thumbQueueTimer = self.setInterval(() => {
      this.processThumbnailQueue();
    }, this.THUMB_QUEUE_INTERVAL);
  }

  private stopThumbnailProcessor(): void {
    if (this.thumbQueueTimer !== null) {
      self.clearInterval(this.thumbQueueTimer);
      this.thumbQueueTimer = null;
    }
    this.thumbQueue = [];
  }

  private async processThumbnailQueue(): Promise<void> {
    // Sort by size (smallest first)
    this.thumbQueue.sort((a, b) => a.size - b.size);
    while (this.thumbQueue.length > 0) {
      const batch: ThumbQueueItem[] = [];
      let batchSize = 0;
      // Build batch based on filesize, filling up to limit
      while (this.thumbQueue.length > 0) {
        const next = this.thumbQueue[0];
        // Add to batch if it fits within size limit, or if batch is empty
        if (batch.length === 0 || batchSize + next.size <= this.THUMB_BATCH_SIZE_BYTES) {
          batch.push(this.thumbQueue.shift()!);
          batchSize += next.size;
        } else {
          break;
        }
      }
      // Process batch
      for (const item of batch) {
        try {
          let thumb: Uint8Array | null = null;
          switch (item.type) {
            case FileType.Image:
              thumb = await gen.imageThumbnail(item.handle);
              break;
            case FileType.Video:
              thumb = await gen.videoThumbnail(item.handle);
              break;
          }
          if (thumb) {
            this.send({
              type: 'delta',
              data: {
                type: 'modified',
                pathId: '',
                fileId: item.fileId,
                file: [item.size, item.type, thumb],
              },
            });
          }
        } catch (error) {
          console.error('[fs-watcher] Error generating thumbnail:', error);
        }
      }
    }
  }
}

const watcher = new FileWatcherWorker();
self.addEventListener('message', async (event: MessageEvent<WorkerMessage>) => {
  const message = event.data;
  switch (message.type) {
    case 'init':
      await watcher.init(message.deviceId);
      break;
    case 'stop':
      watcher.stop();
      break;
  }
});
