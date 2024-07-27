/// <reference lib="webworker"/>

import {Sha256} from './sha256';
import {Path} from '@humanfs/core';

const MEGABYTE = 1024 * 1024;
const CHUNK_SIZE = 1 * MEGABYTE;
const CHUNK_THRESHOLD = 50 * MEGABYTE;

self.onmessage = async (e: MessageEvent<string | FileSystemFileHandle>) => {
  let file: File | FileSystemSyncAccessHandle;
  let total: number;

  // Sync access to OPFS
  if (typeof e.data === 'string') {
    const root = await navigator.storage.getDirectory();
    const handle = await getFileHandle(root, e.data);
    if (!handle) throw new Error('Unable to get file handle');
    file = handle;
    total = file.getSize();
  // Async access to File
  } else {
    file = await e.data.getFile();
    total = file.size;
  }
  
  // Not big enough to incremental hash
  if (total <= CHUNK_THRESHOLD) {
    try {
      const hash = await hashSimple(file, total);
      self.postMessage({type: 'hash::complete', payload: hash});
    } catch (error) {
      self.postMessage({type: 'hash::failure', payload: error});
    }
  // Incremental hashing
  } else {
    try {
      const hash = await hashIncremental(file, total, (bytes) =>
        self.postMessage({type: 'hash::progress', payload: {bytes, total}}));
      self.postMessage({type: 'hash::complete', payload: hash});
    } catch (error) {
      self.postMessage({type: 'hash::failure', payload: error});
    }
  }
};

async function hashSimple(
  file: File | FileSystemSyncAccessHandle,
  total: number,
) {
  let buffer: ArrayBuffer;

  // Async access to File
  if (file instanceof File) {
    buffer = await file.arrayBuffer();
  // Sync access to OPFS
  } else {
    buffer = new ArrayBuffer(total);
    file.read(buffer, {at: 0});
    file.close();
  }

  // Use Crypto Subtle if available
  try {
    const digest = await crypto.subtle.digest('SHA-256', buffer);
    return bytesToHex(new Uint8Array(digest));
  // Fallback to ASM implementation
  } catch (e) {
    const digest = Sha256.bytes(new Uint8Array(buffer));
    if (!digest) throw new Error('Unable to hash chunk');
    return bytesToHex(digest);
  }
}

async function hashIncremental(
  file: File | FileSystemSyncAccessHandle,
  total: number,
  progress: (bytes: number) => void,
) {
  const hash = new Sha256();
  let bytes = 0;

  // Async access to File
  if (file instanceof File) {
    const stream = file.stream();
    await stream.pipeTo(new WritableStream({
      write(chunk) {
        hash.process(chunk);
        bytes += chunk.byteLength;
        progress(bytes);
      }
    }));
  // Sync access to OPFS
  } else {
    const unitSize = Math.min(CHUNK_SIZE, total);
    const unitCount = Math.floor(total / unitSize);
    for (let unit = 0; unit <= unitCount; unit++) {
      const start = unitSize * unit;
      const end = Math.min(unitSize * (unit + 1), total);
      const dat = new ArrayBuffer(end - start);
      file.read(dat, {at: start});
      hash.process(new Uint8Array(dat));
      bytes += dat.byteLength;
      progress(bytes);
    }
    file.close();
  }

  // Finish hashing
  const digest = hash.finish().result;
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

function bytesToHex(data: Uint8Array): string {
  return Array.from(data)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
