import type {HfsImpl} from '@humanfs/types';

export interface FSBase {
  init(): Promise<HfsImpl>,

  getDiskSpace(): Promise<{
    used: number,
    free: number,
    total: number,
  }>,

  openFile(): Promise<FileSystemFileHandle | null>,

  /** Web only */
  importFile: (
    fileHandle: FileSystemFileHandle,
    progress?: (bytes: number, total: number) => void,
  ) => Promise<void>,

  hashFile: (
    pathOrFileHandle: string | FileSystemFileHandle,
    progress?: (bytes: number, total: number) => void,
    chunkSize?: number,
    jobId?: number,
  ) => Promise<string>,

  cancelHash: (id: number) => void,
}
