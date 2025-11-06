import type {PickDirectoryOptions} from 'react-exo/fs';

export enum InitDirectory {
  Transfers = 'transfers',
  Documents = 'documents',
  Music = 'music',
  Pictures = 'pictures',
  Videos = 'videos',
  Games = 'games',
  Books = 'books',
}

export const JUNK_FILES = [
  '.DS_Store',
  'Thumbs.db',
  'desktop.ini',
];

export const INIT_DIRECTORIES = Object.values(InitDirectory)

export function getStartInDir(path: string): PickDirectoryOptions['startIn'] {
  const customDirs = ['transfers', 'games', 'books'];
  return isInitDirectory(path) && !customDirs.includes(path)
    ? (path as PickDirectoryOptions['startIn'])
    : 'downloads';
}

export function isInitDirectory(path?: string): path is PickDirectoryOptions['startIn'] {
  return INIT_DIRECTORIES.includes(path as typeof INIT_DIRECTORIES[number]);
}

export function filterJunkFiles(files: Array<File>): Array<File> {
  return files.filter((file) => !JUNK_FILES.includes(file.name));
}
