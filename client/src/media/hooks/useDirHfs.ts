import {FS} from 'react-exo/fs';
import {useState, useMemo, useCallback, useEffect} from 'react';
import {isInitDirectory} from 'media/utils/path';

import type {HfsDirectoryEntry} from 'react-exo/fs';

export interface DirectoryOptions {
  showHidden?: boolean,
}

export function useDirHfs(path: string, options?: DirectoryOptions) {
  const hfsImpl = useMemo(() => FS.init('fs'), []);
  const [entries, setEntries] = useState<HfsDirectoryEntry[]>([]);
  const {showHidden} = options || {};

  const refresh = useCallback(async () => {
    const hfs = await hfsImpl;
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
  }, [path, hfsImpl, showHidden]);

  // Poll for changes in the directory
  // TODO: replace with observer
  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 1000);
    return () => clearInterval(interval);
  }, [refresh]);

  return {
    path,
    entries,
    refresh,
  };
}
