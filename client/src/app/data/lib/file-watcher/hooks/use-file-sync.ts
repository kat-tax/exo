import {useEffect} from 'react';
import {useEvolu, deviceId} from 'app/data';
import {syncSnapshot, applyDelta} from '../utils/sync';
import {useFileWatcher} from './use-file-watcher';

export function useFileSync() {
  const evolu = useEvolu();
  const watcher = useFileWatcher({
    onReady: () => {
      console.log('[fs-watcher] ready');
    },
    onError: (message) => {
      console.error('[fs-watcher] error:', message);
    },
    onSnapshot: (data) => {
      console.log('[fs-watcher] snapshot:', data);
      syncSnapshot(evolu, deviceId, data);
    },
    onDelta: (data) => {
      console.log('[fs-watcher] delta:', data);
      applyDelta(evolu, deviceId, data);
    },
    onStats: (data) => {
      console.log('[fs-watcher] stats:', data);
    },
  });

  useEffect(() => {
    void watcher.start();
    return watcher.stop;
  }, [watcher]);
}
