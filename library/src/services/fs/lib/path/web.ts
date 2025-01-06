import {Path} from '../core';
import type {FileSystemIn, FileSystemOut} from '../../Fs.interface';

let _root: FileSystemDirectoryHandle | undefined;

export async function getFileBuffer(
  input: FileSystemIn,
): Promise<Buffer> {
  const [file, size] = await getFileAccess(input);
  // Async access to File
  if (file instanceof File) {
    const buffer = await file.arrayBuffer();
    return Buffer.from(buffer, 0, size);
  }
  // Sync access to OPFS
  const buffer = new ArrayBuffer(size);
  file.read(buffer, {at: 0});
  file.close();
  return Promise.resolve(Buffer.from(buffer, 0, size));
}

export async function getFileAccess(
  input: FileSystemIn,
  sync = false,
): Promise<[FileSystemOut, number]> {
  // Lookup path to get handle
  if (typeof input === 'string') {
    const handle = await getFileHandle(input);
    if (!handle) throw new Error('Unable to get file handle');
    const file = sync
      ? await handle.createSyncAccessHandle()
      : await handle.getFile();
    if (file instanceof File) {
      return [file, file.size];
    }
    return [file, file.getSize()];
  }

  // Given sync handle directly
  if (input instanceof FileSystemSyncAccessHandle) {
    return [input, input.getSize()];
  }

  // Given async handle directly
  return [input, input.size];
}

export async function getFileHandle(
  path: string,
): Promise<FileSystemFileHandle | undefined> {
  const root = await getRoot();
  const steps = [...Path.from(path)];

  let cwd = root;
  let name = steps.shift();

  while (cwd && name) {
    if (steps.length > 0) {
      try {
        cwd = await cwd.getDirectoryHandle(name);
      } catch {
        return undefined;
      }
    } else {
      try {
        return cwd.getFileHandle(name);
      } catch {
        return undefined;
      }
    }
    name = steps.shift();
  }

  return undefined;
}

export async function getRoot() {
  if (!_root) {
    _root = await navigator.storage.getDirectory();
  }
  return _root;
}
