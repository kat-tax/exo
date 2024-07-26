import type {HfsImpl} from '@humanfs/types';

export interface FSBase {
  init(): Promise<HfsImpl>,

  getDiskSpace(): Promise<{
    used: number,
    free: number,
    total: number,
  }>,

  hashFile: (
    path: string,
    jobId?: number,
    progress?: (bytes: number) => void,
  ) => Promise<string>,

  cancelHash: (id: number) => void,
}
