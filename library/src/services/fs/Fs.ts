// import ipfs from './lib/plugins/IpfsHfs';
import {hfs} from './lib/plugins/WebHfs';
import Hasher from './lib/hash/WebHasher';
import {isText} from './lib/data';

import type {HfsImpl} from './lib/core/types';
import type {FSBase, FileSystemIn, HfsType, OpenFileOptions, OpenDirectoryOptions} from './Fs.interface';

export class FSService implements FSBase {
  async init(type?: HfsType): Promise<HfsImpl> {
    // TODO: implement ipfs
    return type === 'ipfs' ? hfs : hfs;
  }

  async watch(path: string, callback: (records: unknown[]) => void) {
    try {
      // @ts-expect-error https://github.com/whatwg/fs/blob/main/proposals/FileSystemObserver.md
      const $ = new FileSystemObserver(async (records, observer) => {
        console.log('>> fs', records, observer);
        callback(records);
      });
      const root = await navigator.storage.getDirectory();
      const dir = !!path && await root.getDirectoryHandle(path);
      await $.observe(dir || root, {recursive: false});
      return $.disconnect as () => void;
    } catch (e) {
     console.error('>> fs [error]', e);
     return false;
    }
  }

  async getDiskSpace() {
    const {quota, usage} = await navigator.storage.estimate();
    const total = quota || 0;
    const used = usage || 0;
    return {total, used, free: total - used};
  }

  async openFile(options?: OpenFileOptions) {
    // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker
    const [file]: FileSystemFileHandle[] = await window.showOpenFilePicker(options);
    return file;
  }

  async openDirectory(options?: OpenDirectoryOptions) {
    // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker
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

  async isTextFile(name: string, buffer?: ArrayBuffer) {
    return isText(name, buffer);
  }
}
