import {device} from 'app/data/lib/device';
import type {
  SnapshotData,
  DeltaUpdate,
  WorkerMessage,
  WorkerResponse,
} from '../types';

export interface FileWatcherCallbacks {
  onReady?: () => void;
  onError?: (message: string) => void;
  onSnapshot?: (data: SnapshotData) => void;
  onDelta?: (data: DeltaUpdate) => void;
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
        this.callbacks.onReady?.();
        break;
      case 'error':
        this.callbacks.onError?.(message.message);
        break;
      case 'snapshot':
        this.callbacks.onSnapshot?.(message.data);
        break;
      case 'delta':
        this.callbacks.onDelta?.(message.data);
        break;
    }
  }

  getSnapshot() {
    if (!this.worker) throw new Error('Worker not initialized');
    this.worker.postMessage({type: 'get-snapshot'} satisfies WorkerMessage);
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
