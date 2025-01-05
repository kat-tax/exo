import {FS} from 'react-exo/fs';
import {useCallback} from 'react';

import type {HfsDirectoryEntry} from 'react-exo/fs';

export function useHfsEntry(entry: HfsDirectoryEntry) {
  const {name} = entry;

  const del = useCallback(() => {
    (async () => {
      const hfs = await FS.init('fs');
      await hfs.deleteAll?.(name);
    })();
  }, [name]);

  return {
    del,
  };
}

