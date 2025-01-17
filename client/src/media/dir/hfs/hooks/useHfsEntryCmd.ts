import {FS} from 'react-exo/fs';
import {useCallback} from 'react';

import type {HfsDirectoryEntry} from 'react-exo/fs';

const HFS = FS.init('fs');

export type HfsEntryCmd = {
  del: () => void,
  upload: (files: File[]) => void,
  transfer: (entry: HfsDirectoryEntry) => void,
};

export function useHfsEntryCmd(entry: HfsDirectoryEntry): HfsEntryCmd {
  const {name} = entry;

  const del = useCallback(async () => {
    const hfs = await HFS;
    await hfs?.deleteAll?.(name);
  }, [name]);

  const upload = useCallback(async (files: File[]) => {
    const hfs = await HFS;
    if (!hfs) return;
    for (const file of files) {
      const data = await file.arrayBuffer();
      await hfs?.write?.(`${name}/${file.name}`, new Uint8Array(data));
    }
  }, [name]);

  const transfer = useCallback(async (source: HfsDirectoryEntry) => {
    const hfs = await HFS;
    console.log('>> transfer', source.name, name);
    await hfs?.move?.(source.name, `${name}/${source.name}`);
  }, [name]);

  return {
    del,
    upload,
    transfer,
  };
}
