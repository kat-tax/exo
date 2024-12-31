import type {OpenDirectoryOptions} from 'react-exo/fs';

export enum InitDirectory {
  Documents = 'documents',
  Music = 'music',
  Pictures = 'pictures',
  Videos = 'videos',
  Games = 'games',
  Books = 'books',
  Downloads = 'downloads',
  Uploads = 'uploads'
}

export const INIT_DIRECTORIES = Object.keys(InitDirectory) as (keyof typeof InitDirectory)[];

export function resolve(path: string) {
  return path
    .replace(/^\/browse\/?/, '')
    .split('/');
}

export function getStartInDir(path: string): OpenDirectoryOptions['startIn'] {
  return isInitDirectory(path)
    ? (path as OpenDirectoryOptions['startIn'])
    : 'desktop';
}

export function isInitDirectory(path?: string): path is OpenDirectoryOptions['startIn'] {
  return INIT_DIRECTORIES.includes(path as typeof INIT_DIRECTORIES[number]);
}
