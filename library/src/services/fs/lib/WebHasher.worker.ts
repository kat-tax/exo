/// <reference lib="webworker"/>

import {Path} from '@humanfs/core';
import {Sha256} from './sha256';

self.onmessage = async (e: MessageEvent<{
  path: string,
  chunkSize: number,
}>) => {
  const {path, chunkSize} = e.data;
  const root = await navigator.storage.getDirectory();
  const file = await getFileHandle(root, path);

  if (!file) {
    throw new Error('Unable to get file handle');
  }
  
  const size = file.getSize();
  const disable = true;
  if (!disable && size <= chunkSize) {
    try {
      const hash = await hashChunk(file, size);
      self.postMessage({type: 'hash::complete', payload: hash});
    } catch (error) {
      self.postMessage({type: 'hash::failure', payload: error});
    }
  } else {
    try {
      const hash = await hashFile(file, size, chunkSize, (bytes) =>
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
  file.close();
  try {
    const digest = await crypto.subtle.digest('SHA-256', buffer);
    return bytesToHex(new Uint8Array(digest));
  } catch (e) {
    const digest = Sha256.bytes(new Uint8Array(buffer));
    if (!digest) throw new Error('Unable to hash chunk');
    return bytesToHex(digest);
  }
}

async function hashFile(
  file: FileSystemSyncAccessHandle,
  size: number,
  chunkSize: number,
  progress: (bytes: number) => void,
) {
  let bytes = 0;

  const sha256 = new Sha256();
  const unitSize = Math.min(chunkSize, size);
  const unitCount = Math.floor(size / unitSize);
  
  for (let unit = 0; unit <= unitCount; unit++) {
    const start = unitSize * unit;
    const end = Math.min(unitSize * (unit + 1), size);
    const dat = new ArrayBuffer(end - start);
    file.read(dat, {at: start});
    sha256.process(new Uint8Array(dat));
    bytes += dat.byteLength;
    progress(bytes);
  }

  file.close();
  const digest = sha256.finish().result;
  if (!digest) throw new Error('Unable to hash file');
  return bytesToHex(digest);
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

export function bytesToHex(data: Uint8Array): string {
  return Array.from(data)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
