import {hfs} from '@humanfs/web';
import Hasher from './lib/hash/WebHasher';
import {isText, isBinary} from './lib/data';
import {getFileBuffer} from './lib/path/web';

import type {HfsImpl} from '@humanfs/web';
import type {FSBase, FileSystemIn, OpenDirectoryOptions} from './Fs.interface';

export class FSService implements FSBase {
  async init(): Promise<HfsImpl> {
    return hfs;
  }

  async getDiskSpace() {
    const {quota, usage} = await navigator.storage.estimate();
    const total = quota || 0;
    const used = usage || 0;
    return {total, used, free: total - used};
  }

  async openFile() {
    // @ts-ignore
    const [file]: FileSystemFileHandle[] = await window.showOpenFilePicker();
    return file;
  }

  async openDirectory(options?: OpenDirectoryOptions) {
    // @ts-ignore
    const [folder]: FileSystemDirectoryHandle[] = await window.showDirectoryPicker(options);
    return folder;
  }

  async importFile(fileHandle: FileSystemFileHandle) {
    const folder = await navigator.storage.getDirectory();
    const target = await folder.getFileHandle(fileHandle.name, {create: true});
    const stream = await target.createWritable();
    const source = await fileHandle.getFile();
    await source.stream().pipeTo(stream);
    return target;
  }

  async importDirectory(_dirHandle: FileSystemDirectoryHandle, importPath: string) {
    const root = await navigator.storage.getDirectory();
    const target = await root.getDirectoryHandle(importPath, {create: true});
    return target;
  }

  async hashFile(
    input: FileSystemIn,
    progress?: (bytes: number, total: number) => void,
    jobId?: number,
  ) {
    const sha256 = await Hasher.start(input, progress, jobId);
    const cidPrefix = '1220'; // CID prefix for sha256
    return `${cidPrefix}${sha256}`;
  }

  async cancelHash(jobId: number) {
    return Hasher.cancel(jobId);
  }

  async isTextFile(name: string, file: FileSystemIn) {
    const buffer = await getFileBuffer(file);
    return isText(name, buffer);
  }

  async isBinaryFile(name: string, file: FileSystemIn) {
    const buffer = await getFileBuffer(file);
    return isBinary(name, buffer);
  }
}
