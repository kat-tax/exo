import type {OpenDirectoryOptions} from 'react-exo/fs';

export const INIT_DIRECTORIES = [
  'documents',
  'music',
  'pictures',
  'videos',
  'games',
  'books',
  'downloads',
  'uploads',
] as const;

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
