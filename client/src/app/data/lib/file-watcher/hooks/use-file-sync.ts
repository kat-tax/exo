import {useEffect} from 'react';
import {useEvolu, deviceId} from 'app/data';
import {syncSnapshot, applyDelta} from '../utils/sync';
import {useFileWatcher} from './use-file-watcher';

export function useFileSync() {
  const evolu = useEvolu();
  const watcher = useFileWatcher({
    onReady: () => {
      console.log('File watcher ready');
    },
    onError: (message) => {
      console.error('File watcher error:', message);
    },
    onSnapshot: async (data) => {
      console.log('Received snapshot:', data);
      await syncSnapshot(evolu, deviceId, data);
    },
    onDelta: (data) => {
      console.log('Received delta:', data);
      applyDelta(evolu, deviceId, data);
    },
    onStats: (data) => {
      console.table(data);
    },
  });

  useEffect(() => {
    void watcher.start();
    return watcher.stop;
  }, [watcher]);
}
