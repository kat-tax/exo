/// <reference lib="webworker"/>

import {sha256, createSHA256} from 'hash-wasm';
import {Path} from '@humanfs/core';

const chunkSize = 4E7;

self.onmessage = async (e: MessageEvent<{path: string}>) => {
  const root = await navigator.storage.getDirectory();
  const file = await getFileHandle(root, e.data.path);
  if (!file) {
    throw new Error('Unable to get file handle');
  }
  
  const size = file.getSize();
  if (size <= chunkSize) {
    try {
      const hash = await hashChunk(file, size);
      self.postMessage({type: 'hash::complete', payload: hash});
    } catch (error) {
      self.postMessage({type: 'hash::failure', payload: error});
    }
  } else {
    try {
      const hash = await hashFile(file, size, (bytes) =>
        self.postMessage({type: 'hash::progress', payload: bytes}));
      self.postMessage({type: 'hash::complete', payload: hash});
    } catch (error) {
      self.postMessage({type: 'hash::failure', payload: error});
    }
  }
};

async function hashChunk(
  file: FileSystemSyncAccessHandle,
  size: number,
) {
  const buffer = new ArrayBuffer(size);
  file.read(buffer, {at: 0});
  try {
    const digest = await crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(digest))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (e) {
    return await sha256(new Uint8Array(buffer));
  }
}

async function hashFile(
  file: FileSystemSyncAccessHandle,
  size: number,
  progress: (bytes: number) => void,
) {
  let bytes = 0;

  const fileHash = await createSHA256();
  const unitSize = Math.min(chunkSize, size);
  const unitCount = Math.floor(size / unitSize);
  
  const process = async (unit: number): Promise<string> => {
    const start = unitSize * unit;
    const end = Math.min(unitSize * (unit + 1), size);
    const buffer = new ArrayBuffer(end - start);
    file.read(buffer, {at: start});
    fileHash.update(new Uint8Array(buffer));
    bytes += buffer.byteLength;
    progress(bytes);
    return (unit === unitCount)
      ? fileHash.digest('hex')
      : process(unit + 1);
  };

  fileHash.init();
  return process(0);
}

async function getFileHandle(
  root: FileSystemDirectoryHandle,
  path: string,
): Promise<FileSystemSyncAccessHandle | undefined> {
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
        const handle = await cwd.getFileHandle(name);
        return handle.createSyncAccessHandle();
      } catch {
        return undefined;
      }
    }
    name = steps.shift();
  }

  return undefined;
}
