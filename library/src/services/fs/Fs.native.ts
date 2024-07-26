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

  async hashFile(
    path: string,
    _jobId?: number,
    _progress?: (bytes: number) => void,
  ) {
    return FileSystem.hash(path, 'SHA-256');
  }

  async cancelHash(jobId: number) {
    // TODO: fork react-native-file-access
    console.log('[cancelHash] not implemented on native', jobId);
  }
}
