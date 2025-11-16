/// <reference lib="webworker" />

import {createIdFromString} from '@evolu/common';
import {generateThumbnail} from '../utils/thumbnail';
import {getMediaType, isImageFile} from '../utils/filetype';

import type {
  WorkerMessage,
  WorkerResponse,
  SnapshotData,
  PathSnapshot,
  FileSnapshot,
  StatsData,
} from '../types';

class FileWatcherWorker {
  private observer: FileSystemObserver | null = null;
  private rootHandle: FileSystemDirectoryHandle | null = null;
  private pathsSnapshot: PathSnapshot = {};
  private filesSnapshot: FileSnapshot = {};
  async initialize(_deviceId: string, rootHandle: FileSystemDirectoryHandle) {
    this.rootHandle = rootHandle;
    try {
      // Build initial snapshot
      await this.buildInitialSnapshot();
      // Start observing for changes
      await this.startObserver();
      this.postMessage({type: 'ready'});
    } catch (error) {
      this.postMessage({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  private async buildInitialSnapshot() {
    if (!this.rootHandle) throw new Error('Root handle not set');
    this.pathsSnapshot = {};
    this.filesSnapshot = {};
    const stats: StatsData = {
      totals: {
        entries: 0,
        hashing: 0,
        indexing: 0,
        generating: 0,
      },
    };
    try {
      await this.scanDirectory(this.rootHandle, undefined, stats);
      // Send snapshot to main thread
      this.postMessage({
        type: 'snapshot',
        data: {
          paths: this.pathsSnapshot,
          files: this.filesSnapshot,
        },
      });
      // Send final stats
      this.postMessage({type: 'stats', data: stats});
    } finally {
      // Scanning complete
    }
  }

  private async scanDirectory(
    dirHandle: FileSystemDirectoryHandle,
    parentId: string | undefined,
    stats: StatsData,
  ) {
    const dirPath = await this.getHandlePath(dirHandle);
    const dirId = createIdFromString(dirPath);
    // Add directory to paths snapshot
    this.pathsSnapshot[dirId] = [dirHandle.name, parentId, undefined];
    stats.totals.entries++;
    // Periodically send stats updates
    if (stats.totals.entries % 100 === 0) {
      this.postMessage({type: 'stats', data: {...stats}});
    }
    try {
      // Iterate through directory entries
      // Check if values() method exists (for FileSystemDirectoryHandle)
      if (typeof (dirHandle as any).values === 'function') {
        for await (const entry of (dirHandle as any).values()) {
          if (entry.kind === 'file') {
            await this.processFile(entry, dirId, stats);
          } else if (entry.kind === 'directory') {
            await this.scanDirectory(entry, dirId, stats);
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dirPath}:`, error);
    }
  }

  private async processFile(
    fileHandle: FileSystemFileHandle,
    parentId: string,
    stats: StatsData,
  ) {
    try {
      const filePath = await this.getHandlePath(fileHandle);
      const pathId = createIdFromString(filePath);
      // Get file metadata using SyncAccessHandle when possible
      let size = 0;
      let mimetype = '';
      let thumbnail: Uint8Array | undefined;
      let fileContent: Uint8Array | null = null;
      // Try to use FileSystemSyncAccessHandle for better performance
      try {
        const syncHandle = await (fileHandle as any).createSyncAccessHandle?.();
        if (syncHandle) {
          try {
            size = syncHandle.getSize();
            // Read file content for hashing (limited size for performance)
            const readSize = Math.min(size, 1024 * 1024); // Read max 1MB for hashing
            if (readSize > 0) {
              const buffer = new Uint8Array(readSize);
              syncHandle.read(buffer, {at: 0});
              fileContent = buffer;
            }
          } finally {
            syncHandle.close();
          }
        }
      } catch (syncError) {
        // Fallback to regular File API
        const file = await fileHandle.getFile();
        size = file.size;
        mimetype = file.type || getMediaType(fileHandle.name);
        // Read file content for hashing
        if (size > 0 && size < 1024 * 1024) {
          const buffer = await file.arrayBuffer();
          fileContent = new Uint8Array(buffer);
        }
      }
      // Generate file ID from content hash
      stats.totals.hashing++;
      const fileId = await this.createFileId(fileContent || new Uint8Array(0));
      // Generate thumbnail for images
      if (isImageFile(mimetype || fileHandle.name)) {
        stats.totals.generating++;
        thumbnail = await generateThumbnail(fileHandle);
      }
      // Add to snapshots
      stats.totals.indexing++;
      this.pathsSnapshot[pathId] = [fileHandle.name, parentId, fileId];
      if (!this.filesSnapshot[fileId]) {
        this.filesSnapshot[fileId] = [
          size,
          mimetype || getMediaType(fileHandle.name),
          thumbnail,
        ];
      }
      stats.totals.entries++;
    } catch (error) {
      console.error(`Error processing file ${fileHandle.name}:`, error);
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

  private async handleChangeRecord(record: FileSystemChangeRecord) {
    try {
      const path = record.relativePathComponents.join('/');
      const fullPath = await this.getHandlePath(record.root) + '/' + path;
      const pathId = createIdFromString(fullPath);
      switch (record.type) {
        case 'appeared': {
          // New file or directory appeared
          const parentPath = record.relativePathComponents.slice(0, -1).join('/');
          const parentId = parentPath
            ? createIdFromString(await this.getHandlePath(record.root) + '/' + parentPath)
            : undefined;
          const name = record.relativePathComponents[record.relativePathComponents.length - 1];
          if (record.changedHandle.kind === 'file') {
            const fileHandle = record.changedHandle as FileSystemFileHandle;
            const file = await fileHandle.getFile();
            const fileContent = new Uint8Array(
              await file.arrayBuffer().catch(() => new ArrayBuffer(0)),
            );
            const fileId = await this.createFileId(fileContent);
            const mimetype = file.type || getMediaType(name);
            const thumbnail = isImageFile(mimetype)
              ? await generateThumbnail(fileHandle)
              : undefined;
            this.pathsSnapshot[pathId] = [name, parentId, fileId];
            this.filesSnapshot[fileId] = [file.size, mimetype, thumbnail];
            this.postMessage({
              type: 'delta',
              data: {
                type: 'appeared',
                pathId,
                path: [name, parentId, fileId],
                file: [file.size, mimetype, thumbnail],
              },
            });
          } else {
            this.pathsSnapshot[pathId] = [name, parentId, undefined];
            this.postMessage({
              type: 'delta',
              data: {
                type: 'appeared',
                pathId,
                path: [name, parentId, undefined],
              },
            });
          }
          break;
        }

        case 'disappeared': {
          // File or directory disappeared
          delete this.pathsSnapshot[pathId];
          this.postMessage({
            type: 'delta',
            data: {type: 'disappeared', pathId},
          });
          break;
        }

        case 'modified': {
          // File content modified
          if (record.changedHandle.kind === 'file') {
            const fileHandle = record.changedHandle as FileSystemFileHandle;
            const file = await fileHandle.getFile();
            const fileContent = new Uint8Array(await file.arrayBuffer().catch(() => new ArrayBuffer(0)));
            const fileId = await this.createFileId(fileContent);
            const mimetype = file.type || getMediaType(fileHandle.name);
            const thumbnail = isImageFile(mimetype)
              ? await generateThumbnail(fileHandle)
              : undefined;
            const entry = this.pathsSnapshot[pathId];
            if (entry) {
              entry[2] = fileId;
              this.filesSnapshot[fileId] = [file.size, mimetype, thumbnail];
              this.postMessage({
                type: 'delta',
                data: {
                  type: 'modified',
                  pathId,
                  path: entry,
                  file: [file.size, mimetype, thumbnail],
                },
              });
            }
          }
          break;
        }

        case 'moved': {
          // File or directory moved
          const oldPath =
            (await this.getHandlePath(record.root)) +
            '/' +
            (record.relativePathMovedFrom?.join('/') || '');
          const oldPathId = createIdFromString(oldPath);
          const entry = this.pathsSnapshot[oldPathId];
          if (entry) {
            delete this.pathsSnapshot[oldPathId];
            const parentPath = record.relativePathComponents.slice(0, -1).join('/');
            const parentId = parentPath
              ? createIdFromString(await this.getHandlePath(record.root) + '/' + parentPath)
              : undefined;
            const name = record.relativePathComponents[record.relativePathComponents.length - 1];
            entry[0] = name;
            entry[1] = parentId;
            this.pathsSnapshot[pathId] = entry;
            this.postMessage({
              type: 'delta',
              data: {
                type: 'moved',
                pathId,
                path: entry,
                movedFrom: oldPathId,
              },
            });
          }
          break;
        }

        case 'errored': {
          this.observer?.unobserve(record.root);
          this.postMessage({
            type: 'error',
            message: 'File system observer error',
          });
          break;
        }
      }
    } catch (error) {
      console.error('Error handling change record:', error);
    }
  }

  private async createFileId(content: Uint8Array): Promise<string> {
    // Hash file content
    const hashBuffer = await crypto.subtle.digest('SHA-256', content.buffer as ArrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return createIdFromString(hashHex);
  }

  private async getHandlePath(handle: FileSystemHandle): Promise<string> {
    // For root handle, return empty string
    if (handle === this.rootHandle) return '';
    // Try to resolve path (this is a simplified version)
    // In practice, you might need to traverse up the tree
    return handle.name;
  }

  stop() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  getSnapshot(): SnapshotData {
    return {
      paths: this.pathsSnapshot,
      files: this.filesSnapshot,
    };
  }

  private postMessage(message: WorkerResponse) {
    self.postMessage(message);
  }
}

// Worker instance
const worker = new FileWatcherWorker();

// Message handler
self.addEventListener('message', async (event: MessageEvent<WorkerMessage>) => {
  const message = event.data;
  switch (message.type) {
    case 'init':
      await worker.initialize(message.deviceId, message.rootHandle);
      break;
    case 'stop':
      worker.stop();
      break;
    case 'get-snapshot':
      worker['postMessage']({
        type: 'snapshot',
        data: worker.getSnapshot(),
      });
      break;
  }
});
