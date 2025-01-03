import type {HfsImpl} from '@humanfs/types';
import type {IpfsHfs} from './lib/plugins/IpfsHfs';

export * from '@humanfs/types';
export type HfsType = 'fs' | 'ipfs';

export interface FSBase {
  init(type?: HfsType): Promise<HfsImpl | IpfsHfs>,

  getDiskSpace(): Promise<{
    used: number,
    free: number,
    total: number,
  }>,

  openFile(): Promise<FileSystemFileHandle | null>,
  openDirectory(
    options?: OpenDirectoryOptions,
  ): Promise<FileSystemDirectoryHandle | null>,

  /** Web only, on native returns the same file handle */
  importFile: (
    fileHandle: FileSystemFileHandle,
    progress?: (bytes: number, total: number) => void,
  ) => Promise<FileSystemFileHandle>,

  /** Web only, on native returns the same directory handle */
  importDirectory: (
    dirHandle: FileSystemDirectoryHandle,
    importPath: string,
    progress?: (bytes: number, total: number) => void,
  ) => Promise<FileSystemDirectoryHandle>,

  cancelHash: (id: number) => void,
  hashFile: (
    file: FileSystemIn,
    progress?: (bytes: number, total: number) => void,
    chunkSize?: number,
    jobId?: number,
  ) => Promise<string>,

  isTextFile: (
    name: string,
    buffer?: ArrayBuffer,
  ) => Promise<boolean | null>,
}

export type FileSystemIn = string | File | FileSystemSyncAccessHandle;
export type FileSystemOut = File | FileSystemSyncAccessHandle;

export type OpenDirectoryOptions = {
  id?: string,
  mode?: 'read' | 'readwrite',
  startIn?: 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos',
}



// TODO:
// watcher: https://github.com/whatwg/fs/blob/main/proposals/FileSystemObserver.md
