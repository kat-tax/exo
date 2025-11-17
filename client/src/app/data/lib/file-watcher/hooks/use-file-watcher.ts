import {useRef} from 'react';
import {useCallback, useEffect} from 'react';
import {FileWatcherClient} from '../backend';

import type {FileWatcherCallbacks} from '../backend';

/**
 * React hook for using the file watcher
 */
export function useFileWatcher(callbacks?: FileWatcherCallbacks) {
  const clientRef = useRef<FileWatcherClient | null>(null);

  const start = useCallback(
    async () => {
      // Stop existing watcher if running
      if (clientRef.current) {
        clientRef.current.stop();
      }
      // Create new client
      clientRef.current = new FileWatcherClient(callbacks);
      try {
        await clientRef.current.initialize();
      } catch (error) {
        console.error('Failed to initialize file watcher:', error);
        callbacks?.onError?.(
          error instanceof Error ? error.message : 'Failed to initialize',
        );
      }
    },
    [callbacks],
  );

  const stop = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.stop();
      clientRef.current = null;
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
