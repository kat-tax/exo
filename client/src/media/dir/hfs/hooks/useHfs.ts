import {FS} from 'react-exo/fs';
import {useState, useCallback, useEffect} from 'react';
import {isInitDirectory} from '../utils/path';
import {observe, poll} from '../utils/fs';

import type {HfsDirectoryEntry} from 'react-exo/fs';

const HFS = FS.init('fs');

export interface DirectoryOptions {
  showHidden?: boolean,
}

export function useHfs(path: string, options?: DirectoryOptions) {
  const [entries, setEntries] = useState<HfsDirectoryEntry[]>([]);
  const {showHidden} = options || {};

  const refresh = useCallback(async () => {
    const hfs = await HFS;
    if (!hfs) return;
    const entries: HfsDirectoryEntry[] = [];
    const dirPath = path ? `${path}` : '.';

    try {
      for await (const entry of hfs.list?.(dirPath) ?? []) {
        if (entry.name.endsWith('.crswap'))
          continue;
        if (entry.name.startsWith('.') && !showHidden)
          continue;
        if (dirPath === '.' && isInitDirectory(entry.name))
          continue;
          entries.push(entry);
      }
    } catch (e) {
      console.error('>> refresh', e);
    }
    setEntries(entries.sort((a, b) => {
      if (a.name.startsWith('.') && !showHidden)
        return 1;
      if (b.name.startsWith('.') && !showHidden)
        return -1;
      if (a.isDirectory && !b.isDirectory)
        return -1;
      if (!a.isDirectory && b.isDirectory)
        return 1;
      return a.name.localeCompare(b.name);
    }));
  }, [path, showHidden]);

  useEffect(() => {
    refresh();
    let _disconnect = () => {};
    try {
      observe(path, refresh).then(disconnect => {
        if (!disconnect) {
          let delta = 0;
          console.warn('>> fs [polling]', path);
          const i = setInterval(async () => {
            if (await poll(path, delta)) {
              delta = Date.now();
              refresh();
            }
          }, 200);
          _disconnect = () => clearInterval(i);
        } else {
          _disconnect = disconnect;
        }
      });
    } catch (e) {
      console.error('>> fs [observe]', e);
    }
    return _disconnect;
  }, [path, refresh]);

  return {
    path,
    entries,
    refresh,
  };
}
