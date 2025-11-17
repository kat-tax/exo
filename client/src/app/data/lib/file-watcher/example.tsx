/**
 * Example usage of the file watcher with Evolu sync
 *
 * This demonstrates how to integrate the file watcher into your React components
 * and sync file system changes with the Evolu database.
 */

import {useState, useEffect} from 'react';
import {syncSnapshot, applyDelta} from './sync';
import {useFileWatcher} from './hooks/use-file-watcher';
import {useEvolu} from '../../index';
import * as $ from '../../types';

export function FileWatcherExample() {
  const evolu = useEvolu();
  const [deviceId, setDeviceId] = useState<$.DeviceId | null>(null);
  const [isWatching, setIsWatching] = useState(false);
  const [status, setStatus] = useState<string>('Not started');
  const [stats, setStats] = useState({
    entries: 0,
    hashing: 0,
    indexing: 0,
    generating: 0,
  });

  // Initialize device ID
  useEffect(() => {
    const initDevice = async () => {
      // Get or create device ID
      const query = evolu.createQuery(db => db.selectFrom('device').select(['id']).limit(1));
      const result = await evolu.loadQuery(query);
      if (result.length > 0 && result[0].id) {
        setDeviceId(result[0].id);
      }
    };
    initDevice();
  }, [evolu]);

  const fileWatcher = useFileWatcher({
    onReady: () => {
      console.log('File watcher ready');
      setStatus('Ready - watching for changes');
      setIsWatching(true);
    },

    onError: (message) => {
      console.error('File watcher error:', message);
      setStatus(`Error: ${message}`);
      setIsWatching(false);
    },

    onSnapshot: async (data) => {
      console.log('Received snapshot:', data);
      setStatus('Syncing snapshot with database...');
      if (deviceId) {
        await syncSnapshot(evolu, deviceId, data);
        setStatus('Snapshot synced successfully');
      }
    },

    onDelta: (data) => {
      console.log('Received delta:', data);
      setStatus(`Change detected: ${data.type}`);
      if (deviceId) {
        applyDelta(evolu, deviceId, data);
      }
    },

    onStats: (data) => {
      console.log('Stats update:', data);
      setStats(data.totals);
    },
  });

  const stopWatching = () => {
    fileWatcher.stop();
    setIsWatching(false);
    setStatus('Stopped');
  };

  // Auto-start watching OPFS on mount
  useEffect(() => {
    if (!deviceId) return;
    fileWatcher.start();
    return () => {
      fileWatcher.stop();
    };
  }, [deviceId, fileWatcher]);

  return (
    <div style={{padding: 20}}>
      <h2>File Watcher Example</h2>
      <div style={{marginBottom: 20}}>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Device ID:</strong> {deviceId || 'Not set'}</p>
      </div>
      <div style={{marginBottom: 20}}>
        <h3>Statistics</h3>
        <ul>
          <li>Total Entries: {stats.entries}</li>
          <li>Hashing: {stats.hashing}</li>
          <li>Indexing: {stats.indexing}</li>
          <li>Generating Thumbnails: {stats.generating}</li>
        </ul>
      </div>
      <div style={{display: 'flex', gap: 10}}>
        <button
          onClick={stopWatching}
          disabled={!isWatching}>
          Stop Watching
        </button>
        <button
          onClick={() => fileWatcher.getSnapshot()}
          disabled={!isWatching}>
          Get Snapshot
        </button>
      </div>
    </div>
  );
}
