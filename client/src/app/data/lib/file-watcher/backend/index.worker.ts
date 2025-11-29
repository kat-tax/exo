/// <reference lib="webworker" />

import {hash} from 'react-exo/fs';
import {createIdFromString} from '@evolu/common';
// FIXME: vite build needs these to be relative for some reason
import {DeviceId} from '../../../../../app/data/types';
import {FileType} from '../../../../../media/file/types';
import {getRenderer} from '../../../../../media/file/utils/render';
import {getPathInfo} from '../../../../../media/dir/utils/path';
import {getMediaType} from '../utils/detect';
import {generateImageThumb} from '../utils/generate';
import cfg from 'config';

import type {
  WorkerMessage,
  WorkerResponse,
  SnapshotData,
  FileTuple,
  PathTuple,
} from '../types';

class FileWatcherWorker {
  private rootHandle: FileSystemDirectoryHandle | null = null;
  private deviceId: DeviceId | null = null;
  private observer: FileSystemObserver | null = null;
  private snapshot: SnapshotData = {paths: {}, files: {}};
  private readonly ignoreFolders = [`.${cfg.APP_NAME}-${cfg.STORE_VERSION}`];
  private readonly pendingPathsDelay = 200;
  private pendingPaths = new Set<string>();
  private pendingPathsTimer: number | null = null;

  async init(deviceId: DeviceId): Promise<void> {
    this.rootHandle = await navigator.storage.getDirectory();
    this.deviceId = deviceId;
    try {
      await this.buildSnapshot();
      this.send({type: 'ready', snapshot: this.snapshot});
      this.snapshot = {paths: {}, files: {}};
      await this.startObserver();
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
    }, this.pendingPathsDelay);
  }

  async buildSnapshot(): Promise<void> {
    if (!this.rootHandle) throw new Error('Root handle not set');
    await this.scanDirectory(this.rootHandle, null, '');
  }

  private async scanDirectory(
    dirHandle: FileSystemDirectoryHandle,
    parentId: string | null,
    currentPath: string,
  ): Promise<void> {
    const isRoot = dirHandle === this.rootHandle;
    const dirId = isRoot ? null : this.createPathId(currentPath);
    if (!isRoot && dirId) {
      this.snapshot.paths[dirId] = [dirHandle.name, parentId, null];
    }
    try {
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'directory' && this.ignoreFolders.includes(entry.name)) continue;
        const entryPath = isRoot ? entry.name : `${currentPath}/${entry.name}`;
        entry.kind === 'file' ? await this.processFile(entry as FileSystemFileHandle, dirId, entryPath) :
        entry.kind === 'directory' && await this.scanDirectory(entry as FileSystemDirectoryHandle, dirId, entryPath);
      }
    } catch (error) {
      console.error(`[fs-watcher] error scanning directory ${currentPath}:`, error);
    }
  }

  private async readFileContent(
    fileHandle: FileSystemFileHandle,
  ): Promise<{
    size: number,
    filetype: string,
    content: Uint8Array,
  }> {
    try {
      const syncHandle = await fileHandle.createSyncAccessHandle?.();
      if (syncHandle) {
        try {
          const size = syncHandle.getSize();
          const readSize = Math.min(size, 1024 * 1024);
          const content = readSize > 0 ? new Uint8Array(readSize) : new Uint8Array(0);
          if (readSize > 0) syncHandle.read(content, {at: 0});
          return {size, filetype: getMediaType(fileHandle.name), content};
        } finally {
          syncHandle.close();
        }
      }
    } catch {}
    const file = await fileHandle.getFile();
    const content = file.size > 0 && file.size < 1024 * 1024
      ? new Uint8Array(await file.arrayBuffer())
      : new Uint8Array(0);
    return {size: file.size, filetype: file.type || getMediaType(fileHandle.name), content};
  }

  private async processFileData(
    fileHandle: FileSystemFileHandle,
    size: number,
    filetype: string,
  ): Promise<{
    fileId: string,
    snapshot: FileTuple,
  }> {
    const fileId = await this.createFileId(fileHandle);
    const name = fileHandle.name.split('/').at(-1) ?? fileHandle.name;
    const pathInfo = getPathInfo(name);
    const [fileType] = getRenderer(pathInfo.ext);
    switch (fileType) {
      case FileType.Image: {
        return {
          fileId,
          snapshot: [
            size,
            filetype,
            await generateImageThumb(fileHandle),
          ],
        };
      }
      // case FileType.Video: {
      //   return {
      //     fileId,
      //     snapshot: [
      //       size,
      //       filetype,
      //       await generateVideoThumb(fileHandle),
      //     ],
      //   };
      // }
      default: {
        return {
          fileId,
          snapshot: [
            size,
            filetype,
            null,
          ],
        };
      }
    }
  }

  private async processFile(
    fileHandle: FileSystemFileHandle,
    parentId: string | null,
    filePath: string,
  ): Promise<void> {
    try {
      const pathId = this.createPathId(filePath);
      const {size, filetype} = await this.readFileContent(fileHandle);
      if (size === 0) return;
      const {fileId, snapshot} = await this.processFileData(fileHandle, size, filetype);
      this.snapshot.paths[pathId] = [fileHandle.name, parentId, fileId];
      if (!this.snapshot.files[fileId]) this.snapshot.files[fileId] = snapshot;
    } catch (error) {
      console.error(`[fs-watcher] error processing file ${fileHandle.name}:`, error);
    }
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
    const {fileId, snapshot} = await this.processFileData(fileHandle, file.size, file.type || getMediaType(name));
    const path: PathTuple = [name, parentId, fileId];

    // Send delta with complete data (stateless)
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

  private async handleChangeRecord(record: FileSystemChangeRecord) {
    try {
      // Ignore root folder changes
      if (record.relativePathComponents.length === 0) return;
      // Ignore changes in ignored folders (check path components first)
      if (this.ignoreFolders.includes(record.relativePathComponents[0])) return;
      const {pathId, parentId, name, fullPath} = await this.getRecordPath(record);
      // For ignored directory operations (when changedHandle is available)
      if (record.changedHandle?.kind === 'directory' && this.ignoreFolders.includes(name)) return;
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
          // Send delta with only pathId (stateless - receiver doesn't need snapshot state)
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
            const fileData = await fileHandle.getFile();
            const {fileId, snapshot} = await this.processFileData(fileHandle, fileData.size, fileData.type || getMediaType(name));
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

  private async createFileId(fileHandle: FileSystemFileHandle): Promise<string> {
    // Try to use sync access handle for efficient hashing
    try {
      const syncHandle = await fileHandle.createSyncAccessHandle?.();
      if (syncHandle) {
        try {
          const hashHex = await hash(syncHandle);
          return createIdFromString(hashHex);
        } finally {
          syncHandle.close();
        }
      }
    } catch {}
    // Fallback to File API
    const file = await fileHandle.getFile();
    const hashHex = await hash(file);
    return createIdFromString(hashHex);
  }

  private createPathId(path: string): string {
    return createIdFromString(`${this.deviceId}/${path}`);
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
