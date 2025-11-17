/// <reference lib="webworker" />

import {hash} from 'react-exo/fs';
import {createIdFromString} from '@evolu/common';
import {generateThumbnail} from '../utils/generate';
import {getMediaType, isImageFile} from '../utils/detect';
import cfg from 'config';

import type {
  WorkerMessage,
  WorkerResponse,
  SnapshotData,
  PathSnapshot,
  FileSnapshot,
} from '../types';

class FileWatcherWorker {
  private observer: FileSystemObserver | null = null;
  private rootHandle: FileSystemDirectoryHandle | null = null;
  private pathsSnapshot: PathSnapshot = {};
  private filesSnapshot: FileSnapshot = {};
  private readonly ignoreFolders = [`.${cfg.APP_NAME}-${cfg.STORE_VERSION}`];

  async initialize() {
    this.rootHandle = await navigator.storage.getDirectory();
    try {
      await this.buildSnapshot();
      await this.startObserver();
      this.postMessage({type: 'ready'});
    } catch (error) {
      this.postMessage({type: 'error', message: error instanceof Error ? error.message : 'Unknown error'});
    }
  }

  stop() {
    this.observer?.disconnect();
    this.observer = null;
  }

  getSnapshot(): SnapshotData {
    return {paths: this.pathsSnapshot, files: this.filesSnapshot};
  }

  private async buildSnapshot() {
    if (!this.rootHandle) throw new Error('Root handle not set');
    this.pathsSnapshot = {};
    this.filesSnapshot = {};
    await this.scanDirectory(this.rootHandle, null, '');
    this.postMessage({type: 'snapshot', data: {paths: this.pathsSnapshot, files: this.filesSnapshot}});
  }

  private async scanDirectory(dirHandle: FileSystemDirectoryHandle, parentId: string | null, currentPath: string) {
    const isRoot = dirHandle === this.rootHandle;
    const dirId = isRoot ? null : createIdFromString(currentPath);
    if (!isRoot && dirId) {
      this.pathsSnapshot[dirId] = [dirHandle.name, parentId, null];
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

  private async readFileContent(fileHandle: FileSystemFileHandle): Promise<{size: number; mimetype: string; content: Uint8Array}> {
    try {
      const syncHandle = await fileHandle.createSyncAccessHandle?.();
      if (syncHandle) {
        try {
          const size = syncHandle.getSize();
          const readSize = Math.min(size, 1024 * 1024);
          const content = readSize > 0 ? new Uint8Array(readSize) : new Uint8Array(0);
          if (readSize > 0) syncHandle.read(content, {at: 0});
          return {size, mimetype: getMediaType(fileHandle.name), content};
        } finally {
          syncHandle.close();
        }
      }
    } catch {}
    const file = await fileHandle.getFile();
    const content = file.size > 0 && file.size < 1024 * 1024
      ? new Uint8Array(await file.arrayBuffer())
      : new Uint8Array(0);
    return {size: file.size, mimetype: file.type || getMediaType(fileHandle.name), content};
  }

  private async processFileData(fileHandle: FileSystemFileHandle, size: number, mimetype: string) {
    const fileId = await this.createFileId(fileHandle);
    const thumbnail = isImageFile(mimetype) ? await generateThumbnail(fileHandle) : null;
    return {fileId, snapshot: [size, mimetype, thumbnail] as [number, string, Uint8Array | null]};
  }

  private async processFile(fileHandle: FileSystemFileHandle, parentId: string | null, filePath: string) {
    try {
      const pathId = createIdFromString(filePath);
      const {size, mimetype} = await this.readFileContent(fileHandle);
      const {fileId, snapshot} = await this.processFileData(fileHandle, size, mimetype);
      this.pathsSnapshot[pathId] = [fileHandle.name, parentId, fileId];
      if (!this.filesSnapshot[fileId]) this.filesSnapshot[fileId] = snapshot;
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

  private async getRecordPath(record: FileSystemChangeRecord, pathComponents?: string[]): Promise<{pathId: string; parentId: string | null; name: string}> {
    const components = pathComponents || record.relativePathComponents;
    const fullPath = components.join('/');
    const pathId = createIdFromString(fullPath);
    const parentPath = components.slice(0, -1).join('/');
    const parentId = parentPath ? createIdFromString(parentPath) : null;
    const name = components[components.length - 1];
    return {pathId, parentId, name};
  }

  private async handleFileChange(fileHandle: FileSystemFileHandle, pathId: string, name: string, parentId: string | null, changeType: 'appeared' | 'modified') {
    const file = await fileHandle.getFile();
    const {fileId, snapshot} = await this.processFileData(fileHandle, file.size, file.type || getMediaType(name));
    const path = [name, parentId, fileId] as [string, string | null, string];
    this.pathsSnapshot[pathId] = path;
    this.filesSnapshot[fileId] = snapshot;
    this.postMessage({type: 'delta', data: {type: changeType, pathId, path, file: snapshot}});
  }

  private async handleChangeRecord(record: FileSystemChangeRecord) {
    try {
      // Ignore root folder changes
      if (record.relativePathComponents.length === 0) return;
      const {pathId, parentId, name} = await this.getRecordPath(record);
      // Ignore changes in ignored folders
      if (record.changedHandle.kind === 'directory' && this.ignoreFolders.includes(name)) return;
      if (this.ignoreFolders.includes(record.relativePathComponents[0])) return;
      switch (record.type) {
        case 'appeared':
          if (record.changedHandle.kind === 'file') {
            await this.handleFileChange(record.changedHandle as FileSystemFileHandle, pathId, name, parentId, 'appeared');
          } else {
            this.pathsSnapshot[pathId] = [name, parentId, null];
            this.postMessage({type: 'delta', data: {type: 'appeared', pathId, path: [name, parentId, null]}});
          }
          break;
        case 'disappeared':
          delete this.pathsSnapshot[pathId];
          this.postMessage({type: 'delta', data: {type: 'disappeared', pathId}});
          break;
        case 'modified':
          if (record.changedHandle.kind === 'file') {
            const entry = this.pathsSnapshot[pathId];
            if (entry) {
              await this.handleFileChange(record.changedHandle as FileSystemFileHandle, pathId, name, parentId, 'modified');
              entry[2] = this.pathsSnapshot[pathId][2];
            }
          }
          break;
        case 'moved':
          const {pathId: oldPathId} = await this.getRecordPath(record, record.relativePathMovedFrom ? [...record.relativePathMovedFrom] : undefined);
          const entry = this.pathsSnapshot[oldPathId];
          if (entry) {
            delete this.pathsSnapshot[oldPathId];
            entry[0] = name;
            entry[1] = parentId;
            this.pathsSnapshot[pathId] = entry;
            this.postMessage({type: 'delta', data: {type: 'moved', pathId, path: entry, movedFrom: oldPathId}});
          }
          break;
        case 'errored':
          this.observer?.unobserve(record.root);
          this.postMessage({type: 'error', message: 'File system observer error'});
          break;
      }
    } catch (error) {
      console.error('[fs-watcher] error handling change record:', error);
    }
  }

  private async createFileId(fileHandle: FileSystemFileHandle): Promise<string> {
    try {
      // Try to use sync access handle for efficient hashing
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

  private postMessage(message: WorkerResponse) {
    self.postMessage(message);
  }
}

const watcher = new FileWatcherWorker();

self.addEventListener('message', async (event: MessageEvent<WorkerMessage>) => {
  const message = event.data;
  switch (message.type) {
    case 'init':
      await watcher.initialize();
      break;
    case 'stop':
      watcher.stop();
      break;
    case 'get-snapshot':
      watcher['postMessage']({
        type: 'snapshot',
        data: watcher.getSnapshot(),
      });
      break;
  }
});
