import type {HfsImpl} from '@humanfs/types';

export interface FSBase {
  init(): Promise<HfsImpl>,

  getDiskSpace(): Promise<{
    used: number,
    free: number,
    total: number,
  }>,

  openFile(): Promise<FileSystemFileHandle | null>,

  openFolder(): Promise<FileSystemDirectoryHandle | null>,

  /** Web only, on native returns the same file handle */
  importFile: (
    fileHandle: FileSystemFileHandle,
    progress?: (bytes: number, total: number) => void,
  ) => Promise<FileSystemFileHandle>,

  /** Web only, on native returns the same directory handle */
  importFolder: (
    dirHandle: FileSystemDirectoryHandle,
    progress?: (bytes: number, total: number) => void,
  ) => Promise<FileSystemDirectoryHandle>,

  hashFile: (
    pathOrFileHandle: string | FileSystemFileHandle,
    progress?: (bytes: number, total: number) => void,
    chunkSize?: number,
    jobId?: number,
  ) => Promise<string>,

  cancelHash: (id: number) => void,
}
