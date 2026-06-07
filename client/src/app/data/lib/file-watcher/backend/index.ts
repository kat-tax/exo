import {device} from 'app/data/lib/device';
import {emitPaths} from '../events';
import type {
  SnapshotData,
  DeltaUpdate,
  WorkerMessage,
  WorkerResponse,
} from '../types';

export interface FileWatcherCallbacks {
  onReady?: (snapshot: SnapshotData) => void;
  onError?: (message: string) => void;
  onDelta?: (data: DeltaUpdate) => void;
  onPaths?: (paths: string[]) => void;
}

export class FileWatcherClient {
  private worker: Worker | null = null;
  private callbacks: FileWatcherCallbacks = {};
  constructor(callbacks?: FileWatcherCallbacks) {
    this.callbacks = callbacks || {};
  }

  async initialize() {
    this.worker = new Worker(new URL('./index.worker.ts', import.meta.url), {type: 'module'});
    this.worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      this.handleWorkerMessage(event.data);
    };
    this.worker.onerror = (error) => {
      console.error('File watcher worker error:', error);
      this.callbacks.onError?.(`Worker error: ${error.message}`);
    };
    this.worker.postMessage({type: 'init', deviceId: device.id} satisfies WorkerMessage);
  }

  private handleWorkerMessage(message: WorkerResponse) {
    switch (message.type) {
      case 'ready':
        this.callbacks.onReady?.(message.snapshot);
        break;
      case 'error':
        this.callbacks.onError?.(message.message);
        break;
      case 'delta':
        this.callbacks.onDelta?.(message.data);
        break;
      case 'paths':
        emitPaths(message.paths);
        this.callbacks.onPaths?.(message.paths);
        break;
    }
  }

  stop() {
    if (this.worker) {
      this.worker.postMessage({type: 'stop'} satisfies WorkerMessage);
      this.worker.terminate();
      this.worker = null;
    }
  }

  isRunning(): boolean {
    return this.worker !== null;
  }
}
