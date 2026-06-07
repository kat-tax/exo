import {useEffect} from 'react';
import {useEvolu} from 'app/data';
import {device} from 'app/data/lib/device';
import {syncSnapshot, applyDelta} from '../utils/sync';
import {useFileWatcher} from './use-file-watcher';

export function useFileSync() {
  const evolu = useEvolu();
  const watcher = useFileWatcher({
    onReady: (snapshot) => {
      console.log('[fs-watcher] ready', snapshot);
      syncSnapshot(evolu, device.id, snapshot);
    },
    onError: (message) => {
      console.error('[fs-watcher] error:', message);
    },
    onDelta: (data) => {
      console.log('[fs-watcher] delta:', data);
      applyDelta(evolu, device.id, data);
    },
  });

  useEffect(() => {
    void watcher.start();
    return watcher.stop;
  }, [watcher]);
}
