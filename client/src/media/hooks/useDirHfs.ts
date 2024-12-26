import {FS} from 'react-exo/fs';
import {useState, useEffect} from 'react';
import {isInitDirectory} from 'media/utils/path';
import {resolve} from 'media/utils/path';

import type {HfsType, HfsDirectoryEntry} from 'react-exo/fs';

export interface DirectoryOptions {
  showHidden?: boolean,
}

export function useDirHfs(uri: string, options?: DirectoryOptions) {
  const [entries, setEntries] = useState<HfsDirectoryEntry[]>([]);
  const {showHidden} = options || {};

  const parts = resolve(uri);
  const provider = (parts[0] || 'fs') as HfsType;
  const path = parts.slice(2).join('/');

  useEffect(() => {
    (async () => {
      const hfs = await FS.init(provider);
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
    })();
  }, [path, provider, showHidden]);

  return {
    path,
    entries,
    provider,
  };
}
