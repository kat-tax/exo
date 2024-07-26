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
    progress?: (bytes: number) => void,
    chunkSize?: number,
    jobId?: number,
  ) => Promise<string>,

  cancelHash: (id: number) => void,
}
