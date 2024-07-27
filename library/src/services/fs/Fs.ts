import {hfs} from '@humanfs/web';
import Hasher from './lib/WebHasher';
import type {FSBase} from './Fs.interface';

export class FSService implements FSBase {
  async init() {
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

  async importFile(file: FileSystemFileHandle) {
    const folder = await navigator.storage.getDirectory();
    const target = await folder.getFileHandle(file.name, {create: true});
    const source = await file.getFile();
    const stream = await target.createWritable();
    await source.stream().pipeTo(stream);
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
