import type {HfsImpl} from '@humanfs/types';
import type {HashAlgorithm} from 'react-native-file-access';

export interface FSBase {
  init(): Promise<HfsImpl>,

  getDiskSpace(): Promise<{
    used: number,
    free: number,
    total: number,
  }>,

  hashFile: (
    filePath: string,
    algorithm: HashAlgorithm,
  ) => Promise<string>,
}
