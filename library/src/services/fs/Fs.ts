import {hfs} from '@humanfs/web';
import Hasher from './lib/WebHasher';

import type {FSBase} from './Fs.interface';
import type {HfsImpl} from '@humanfs/web';

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

  async openFolder() {
    // @ts-ignore
    const [folder]: FileSystemDirectoryHandle[] = await window.showDirectoryPicker();
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

  async importFolder(folderHandle: FileSystemDirectoryHandle) {
    const root = await navigator.storage.getDirectory();
    const target = await root.getDirectoryHandle(folderHandle.name, {create: true});
    return target;
  }

  async hashFile(
    pathOrFileHandle: string | FileSystemFileHandle,
    progress?: (bytes: number, total: number) => void,
    jobId?: number,
  ) {
    return Hasher.start(pathOrFileHandle, progress, jobId);
  }

  async cancelHash(jobId: number) {
    return Hasher.cancel(jobId);
  }
}
