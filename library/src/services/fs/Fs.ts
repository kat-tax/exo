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

  async hashFile(
    path: string,
    jobId?: number,
    progress?: (bytes: number) => void,
  ) {
    return Hasher.start(path, jobId, progress);
  }

  async cancelHash(jobId: number) {
    return Hasher.cancel(jobId);
  }
}
