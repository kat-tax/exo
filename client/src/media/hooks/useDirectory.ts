import {fs} from 'react-exo/fs';
import {useState, useEffect} from 'react';
import {INIT_DIRECTORIES} from './useInitDirectories';
import type {HfsDirectoryEntry} from 'react-exo/fs';

interface DirectoryOptions {
  showHidden?: boolean;
}

export function useDirectory(path: string, options?: DirectoryOptions) {
  const [entries, setEntries] = useState<HfsDirectoryEntry[]>([]);

  useEffect(() => {
    (async () => {
      const hfs = await fs.init();
      const entries: HfsDirectoryEntry[] = [];
      const dirPath = path || '.';
      for await (const entry of hfs.list?.(dirPath) ?? []) {
        if (entry.name.endsWith('.crswap')) continue;
        if (entry.name.startsWith('.') && !options?.showHidden) continue;
        if (dirPath === '.' && INIT_DIRECTORIES.includes(entry.name)) continue;
        entries.push(entry);
      }
      setEntries(entries.sort((a, b) => {
        if (a.name.startsWith('.') && !options?.showHidden) return 1;
        if (b.name.startsWith('.') && !options?.showHidden) return -1;
        return a.name.localeCompare(b.name);
      }));
    })();
  });

  return entries;
}
