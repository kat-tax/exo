import hfs from './lib/plugins/NativeHfs';
// import ipfs from './lib/plugins/IpfsHfs';
import {FileSystem} from 'react-native-file-access';
import {isText, isBinary} from './lib/data';

import type {FSBase, FileSystemIn, HfsType} from './Fs.interface';

export class FSService implements FSBase {
  async init(type?: HfsType) {
    return type === 'ipfs' ? hfs : hfs; // TODO: implement ipfs
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
    input: FileSystemIn,
    _progress?: (bytes: number, total: number) => void,
    _chunkSize?: number,
    _jobId?: number,
  ) {
    if (typeof input !== 'string')
      throw new Error('[hashFile] file input not supported on native');
    const cidPrefix = '1220'; // CID prefix for sha256
    const sha256 = await FileSystem.hash(input, 'SHA-256');
    return `${cidPrefix}${sha256}`;
  }

  async cancelHash(jobId: number) {
    // TODO: fork react-native-file-access
    console.log('[cancelHash] not implemented on native', jobId);
  }

  async isTextFile(name: string, input: FileSystemIn) {
    if (typeof input !== 'string')
      throw new Error('[isTextFile] file input not supported on native');
    return isText(name);
  }

  async isBinaryFile(name: string, input: FileSystemIn) {
    if (typeof input !== 'string')
      throw new Error('[isBinaryFile] file input not supported on native');
    return isBinary(name);
  }
}
