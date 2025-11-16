import {useRef} from 'react';
import {useCallback, useEffect} from 'react';
import {FileWatcherClient} from '../backend';

import type {DeviceId} from 'app/data/types';
import type {FileWatcherCallbacks} from '../backend';

/**
 * React hook for using the file watcher
 */
export function useFileWatcher(
  deviceId: DeviceId | null,
  callbacks?: FileWatcherCallbacks,
) {
  const clientRef = useRef<FileWatcherClient | null>(null);
  const rootHandleRef = useRef<FileSystemDirectoryHandle | null>(null);

  const start = useCallback(
    async (rootHandle: FileSystemDirectoryHandle) => {
      if (!deviceId) {
        console.warn('Cannot start file watcher without device ID');
        return;
      }
      // Stop existing watcher if running
      if (clientRef.current) {
        clientRef.current.stop();
      }
      // Create new client
      clientRef.current = new FileWatcherClient(callbacks);
      rootHandleRef.current = rootHandle;
      try {
        await clientRef.current.initialize(deviceId, rootHandle);
      } catch (error) {
        console.error('Failed to initialize file watcher:', error);
        callbacks?.onError?.(
          error instanceof Error ? error.message : 'Failed to initialize',
        );
      }
    },
    [deviceId, callbacks],
  );

  const stop = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.stop();
      clientRef.current = null;
      rootHandleRef.current = null;
    }
  }, []);

  const getSnapshot = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.getSnapshot();
    }
  }, []);

  const isRunning = useCallback(() => {
    return clientRef.current?.isRunning() || false;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (clientRef.current) {
        clientRef.current.stop();
      }
    };
  }, []);

  return {
    start,
    stop,
    getSnapshot,
    isRunning,
  };
}
