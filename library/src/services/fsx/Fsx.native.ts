import ReactNativeHfs from './lib/react-native';
import {FileSystem} from 'react-native-file-access';

import type {FSBase} from './Fsx.interface';
import type {HashAlgorithm} from 'react-native-file-access';

export class FSService implements FSBase {
  async init() {
    return ReactNativeHfs;
  }

  async getDiskSpace() {
    const disk = await FileSystem.df();
    const total = disk.internal_total + (disk.external_total || 0);
    const free = disk.internal_free + (disk.external_free || 0);
    return {total, free, used: total - free};
  }

  async hashFile(filePath: string, algorithm: HashAlgorithm) {
    return FileSystem.hash(filePath, algorithm);
  }
}
