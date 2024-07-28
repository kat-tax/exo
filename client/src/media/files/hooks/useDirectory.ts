import {fs} from 'react-exo/fs';
import {useState, useEffect} from 'react';

import type {HfsDirectoryEntry} from 'react-exo/fs';

export function useDirectory(path: string) {
  const [entries, setEntries] = useState<HfsDirectoryEntry[]>([]);

  useEffect(() => {
    (async () => {
      const hfs = await fs.init();
      const entries: HfsDirectoryEntry[] = [];
      for await (const entry of hfs.list?.(path || '.') ?? [])
        entries.push(entry);
      setEntries(entries);
    })();
  }, [path]);

  return entries;
}
