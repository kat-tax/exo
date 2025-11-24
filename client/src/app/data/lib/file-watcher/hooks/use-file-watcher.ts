import {useRef, useCallback, useEffect} from 'react';
import {FileWatcherClient} from '../backend';
import type {FileWatcherCallbacks} from '../backend';

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
      } catch (e) {
        console.error('Failed to initialize file watcher:', e);
        callbacks?.onError?.(e instanceof Error ? e.message : 'Failed to initialize');
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
    isRunning,
  };
}
