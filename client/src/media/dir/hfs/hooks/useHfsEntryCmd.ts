import {useCallback} from 'react';
import {useAppContext} from 'app/hooks/useAppContext';

import type {HfsDirectoryEntry} from 'react-exo/fs';

export type HfsEntryCmd = {
  del: () => void,
  upload: (files: File[]) => void,
  transfer: (entry: HfsDirectoryEntry) => void,
};

export function useHfsEntryCmd(entry: HfsDirectoryEntry): HfsEntryCmd {
  const {filesystem} = useAppContext();
  const {name} = entry;

  const del = useCallback(async () => {
    await filesystem?.deleteAll?.(name);
  }, [name, filesystem]);

  const upload = useCallback(async (files: File[]) => {
    if (!filesystem) return;
    for (const file of files) {
      const data = await file.arrayBuffer();
      await filesystem?.write?.(`${name}/${file.name}`, new Uint8Array(data));
    }
  }, [name, filesystem]);

  const transfer = useCallback(async (source: HfsDirectoryEntry) => {
    if (!filesystem) return;
    console.log('>> transfer', source.name, name);
    await filesystem?.move?.(source.name, `${name}/${source.name}`);
  }, [name, filesystem]);

  return {
    del,
    upload,
    transfer,
  };
}
