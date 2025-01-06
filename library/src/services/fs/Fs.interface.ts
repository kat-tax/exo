import type {HfsImpl} from '@humanfs/types';
import type {IpfsHfs} from './lib/plugins/IpfsHfs';

export * from '@humanfs/types';
export type HfsType = 'fs' | 'ipfs';

export interface FSBase {
  init(type?: HfsType): Promise<HfsImpl | IpfsHfs>,

  watch(path: string, callback: (records: unknown[]) => void): Promise<false | (() => void)>,

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
    jobId?: number,
  ) => Promise<string>,

  isTextFile: (
    name: string,
    buffer?: ArrayBuffer,
  ) => Promise<boolean | null>,
}

export type FileSystemIn = string | File | FileSystemSyncAccessHandle;
export type FileSystemOut = File | FileSystemSyncAccessHandle;

export type OpenFileOptions = {
  /** By specifying an ID, the browser can remember different directories for different IDs. If the same ID is used for another picker, the picker opens in the same directory. */
  id?: string,
  /** The mode of the file system access handle to be created. */
  mode?: 'read' | 'readwrite',
  /** By default the picker should include an option to not apply any file type filters (instigated with the type option below). Setting this option to true means that option is not available. */
  excludeAcceptAllOption?: boolean,
  /** When set to true multiple files may be selected. */
  multiple?: boolean,
  /** A FileSystemHandle or a well known directory ("desktop", "documents", "downloads", "music", "pictures", or "videos") to open the dialog in. */
  startIn?: 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos',
  /** An Array of allowed file types to pick. Each item is an object with the following options: */
  types?: {
    /** An optional description of the category of files types allowed. Defaults to an empty string. */
    description?: string,
    /** An Object with the keys set to the MIME type and the values an Array of file extensions (see below for an example). */
    accept: {[mimetype: string]: string[]},
  }[],
}

export type OpenDirectoryOptions = {
  /** By specifying an ID, the browser can remember different directories for different IDs. If the same ID is used for another picker, the picker opens in the same directory. */
  id?: string,
  /** The mode of the file system access handle to be created. */
  mode?: 'read' | 'readwrite',
  /** A FileSystemHandle or a well known directory ("desktop", "documents", "downloads", "music", "pictures", or "videos") to open the dialog in. */
  startIn?: 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos',
}
