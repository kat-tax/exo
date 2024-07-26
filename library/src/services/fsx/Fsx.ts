import {WebHfs} from '@humanfs/web';

import type {FSBase} from './Fsx.interface';
import type {HashAlgorithm} from 'react-native-file-access';

export class FSService implements FSBase {
  async init() {
    const root = await navigator.storage.getDirectory();
    return new WebHfs({root});
  }

  async getDiskSpace() {
    const {quota, usage} = await navigator.storage.estimate();
    const total = quota || 0;
    const used = usage || 0;
    return {total, used, free: total - used};
  }

  async hashFile(filePath: string, algorithm: HashAlgorithm) {
    // TODO: Implement
    console.log('[hashFile]', filePath, algorithm);
    return '';
  }
}
