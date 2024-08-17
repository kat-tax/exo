/// <reference lib="webworker"/>

import {Sha256} from './sha256';
import {getFileAccess, getFileBuffer} from '../path/web';
import type {FileSystemIn} from '../../Fs.interface';

// @ts-ignore
// biome-ignore lint/complexity/useLiteralKeys: TS doesn't know about deviceMemory
const MEMORY = navigator['deviceMemory'] || 0.2;
const CORES = Math.max(navigator.hardwareConcurrency || 1, 5);

const MEGABYTE = 1024 * 1024;
const GIGABYTE = 1024 * MEGABYTE;
const CHUNK_SIZE = 1 * MEGABYTE;
const INCREMENTAL_THRESHOLD = Math.max(
  20 * MEGABYTE,
  (MEMORY / CORES) * GIGABYTE - (200 * MEGABYTE),
);

self.onmessage = async (e: MessageEvent<FileSystemIn>) => {
  const [file, total] = await getFileAccess(e.data, true);

  // Not big enough to incremental hash
  if (total <= INCREMENTAL_THRESHOLD) {
    try {
      const hash = await hashSimple(file);
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

async function hashSimple(file: File | FileSystemSyncAccessHandle) {
  // Read entire file into buffer
  const buffer = await getFileBuffer(file);
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

function bytesToHex(data: Uint8Array): string {
  return Array.from(data)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
