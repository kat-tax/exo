// @ts-ignore
import HashWorker from './WebHasher.worker?worker&inline';

const _workers = new Map<number, Worker>();

async function start(
  pathOrFileHandle: string | FileSystemFileHandle,
  progress?: (bytes: number, total: number) => void,
  jobId?: number,
) {
  const worker: Worker = new HashWorker();
  worker.postMessage(pathOrFileHandle);
  jobId && _workers.set(jobId, worker);

  return new Promise<string>((resolve, reject) => {
    worker.onmessage = (e) => {
      switch (e.data.type) {
        case 'hash::progress': {
          const {bytes, total} = e.data.payload;
          progress?.(bytes, total);
          break;
        }
        case 'hash::complete': {
          resolve(e.data.payload);
          worker.terminate();
          jobId && _workers.delete(jobId);
          break;
        }
        case 'hash::failure': {
          reject(e.data.payload);
          worker.terminate();
          jobId && _workers.delete(jobId);
          break;
        }
      }
    };

    worker.onerror = (e) => {
      reject(e.message ? e : new Error('Hash worker failed'));
    };
  });
}

async function cancel(jobId: number) {
  const worker = _workers.get(jobId);
  worker?.terminate();
}

export default {start, cancel};
