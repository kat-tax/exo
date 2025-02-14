import type {OpenDirectoryOptions} from 'react-exo/fs';

export enum InitDirectory {
  Transfers = 'transfers',
  Documents = 'documents',
  Music = 'music',
  Pictures = 'pictures',
  Videos = 'videos',
  Games = 'games',
  Books = 'books',
}

export const INIT_DIRECTORIES = Object.values(InitDirectory)

export function getStartInDir(path: string): OpenDirectoryOptions['startIn'] {
  return isInitDirectory(path)
    ? (path as OpenDirectoryOptions['startIn'])
    : 'desktop';
}

export function isInitDirectory(path?: string): path is OpenDirectoryOptions['startIn'] {
  return INIT_DIRECTORIES.includes(path as typeof INIT_DIRECTORIES[number]);
}
