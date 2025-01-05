import {FS} from 'react-exo/fs';
import {useState, useCallback, useEffect} from 'react';
import {isInitDirectory} from 'media/utils/path';
import {observe} from 'media/utils/fs';

import type {HfsDirectoryEntry} from 'react-exo/fs';

const FILESYSTEM = FS.init('fs');
const POLL_TIMEOUT = 1000; // ms

export interface DirectoryOptions {
  showHidden?: boolean,
}

export function useDirHfs(path: string, options?: DirectoryOptions) {
  const [entries, setEntries] = useState<HfsDirectoryEntry[]>([]);
  const {showHidden} = options || {};

  const refresh = useCallback(async () => {
    const hfs = await FILESYSTEM;
    if (!hfs) return;
    const entries: HfsDirectoryEntry[] = [];
    const dirPath = path || '.';
    for await (const entry of hfs.list?.(dirPath) ?? []) {
      if (entry.name.endsWith('.crswap'))
        continue;
      if (entry.name.startsWith('.') && !showHidden)
        continue;
      if (dirPath === '.' && isInitDirectory(entry.name))
        continue;
      entries.push(entry);
    }
    setEntries(entries.sort((a, b) => {
      if (a.name.startsWith('.') && !showHidden)
        return 1;
      if (b.name.startsWith('.') && !showHidden)
        return -1;
      return a.name.localeCompare(b.name);
    }));
  }, [path, showHidden]);

  useEffect(() => {
    refresh();
    let _disconnect = () => {};
    observe(refresh).then(disconnect => {
      if (!disconnect) {
        const interval = setInterval(refresh, POLL_TIMEOUT);
        _disconnect = () => clearInterval(interval);
      } else {
        _disconnect = disconnect;
      }
    });
    return _disconnect;
  }, [refresh]);

  return {
    path,
    entries,
    refresh,
  };
}
