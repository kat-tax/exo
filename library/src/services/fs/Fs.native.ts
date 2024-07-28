import {hfs} from './lib/NativeHfs';
import {FileSystem} from 'react-native-file-access';

import type {FSBase} from './Fs.interface';

export class FSService implements FSBase {
  async init() {
    return hfs;
  }

  async getDiskSpace() {
    const disk = await FileSystem.df();
    const total = disk.internal_total + (disk.external_total || 0);
    const free = disk.internal_free + (disk.external_free || 0);
    return {total, free, used: total - free};
  }

  async openFile() {
    return null;
  }

  async openDirectory() {
    return null;
  }

  async importFile(fileHandle: FileSystemFileHandle) {
    return fileHandle;
  }

  async importDirectory(dirHandle: FileSystemDirectoryHandle) {
    return dirHandle;
  }

  async hashFile(
    pathOrFileHandle: string | FileSystemFileHandle,
    _progress?: (bytes: number, total: number) => void,
    _chunkSize?: number,
    _jobId?: number,
  ) {
    if (typeof pathOrFileHandle !== 'string')
      throw new Error('[hashFile] file input not supported on native');
    return FileSystem.hash(pathOrFileHandle, 'SHA-256');
  }

  async cancelHash(jobId: number) {
    // TODO: fork react-native-file-access
    console.log('[cancelHash] not implemented on native', jobId);
  }
}
