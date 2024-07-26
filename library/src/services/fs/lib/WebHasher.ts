const _workers = new Map<number, Worker>();

async function start(
  path: string,
  jobId?: number,
  progress?: (bytes: number) => void,
) {
  const worker = new Worker(new URL('./WebHasher.worker.ts', import.meta.url));
  jobId && _workers.set(jobId, worker);
  worker.postMessage({path});

  return new Promise<string>((resolve, reject) => {
    worker.onmessage = (e) => {
      switch (e.data.type) {
        case 'hash::progress':
          progress?.(e.data.payload);
          break;
        case 'hash::complete':
          resolve(e.data.payload);
          worker.terminate();
          jobId && _workers.delete(jobId);
          break;
        case 'hash::failure':
          reject(e.data.payload);
          worker.terminate();
          jobId && _workers.delete(jobId);
          break;
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
