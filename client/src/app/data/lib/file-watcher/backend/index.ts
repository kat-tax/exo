import type {DeviceId} from 'app/data/types';
import type {
  WorkerMessage,
  WorkerResponse,
  SnapshotData,
  DeltaUpdate,
  StatsData,
} from '../types';

export interface FileWatcherCallbacks {
  onReady?: () => void;
  onError?: (message: string) => void;
  onSnapshot?: (data: SnapshotData) => void;
  onDelta?: (data: DeltaUpdate) => void;
  onStats?: (data: StatsData) => void;
}

export class FileWatcherClient {
  private worker: Worker | null = null;
  private callbacks: FileWatcherCallbacks = {};
  constructor(callbacks?: FileWatcherCallbacks) {
    this.callbacks = callbacks || {};
  }

  async initialize(deviceId: DeviceId, rootHandle: FileSystemDirectoryHandle) {
    // Create worker
    this.worker = new Worker(new URL('./index.worker.ts', import.meta.url), {type: 'module'});
    // Set up message handler
    this.worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      this.handleWorkerMessage(event.data);
    };
    // Handle loading errors
    this.worker.onerror = (error) => {
      console.error('File watcher worker error:', error);
      this.callbacks.onError?.(`Worker error: ${error.message}`);
    };
    // Send init message
    const message: WorkerMessage = {
      type: 'init',
      deviceId,
      rootHandle,
    };
    this.worker.postMessage(message);
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
      case 'stats':
        this.callbacks.onStats?.(message.data);
        break;
    }
  }

  getSnapshot() {
    if (!this.worker) throw new Error('Worker not initialized');
    const message: WorkerMessage = {type: 'get-snapshot'};
    this.worker.postMessage(message);
  }

  stop() {
    if (this.worker) {
      const message: WorkerMessage = {type: 'stop'};
      this.worker.postMessage(message);
      this.worker.terminate();
      this.worker = null;
    }
  }

  isRunning(): boolean {
    return this.worker !== null;
  }
}
