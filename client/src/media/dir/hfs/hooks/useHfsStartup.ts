import {FS} from 'react-exo/fs';
import {useEffect} from 'react';
import {INIT_DIRECTORIES} from '../utils/path';

export function useHfsStartup() {
  useEffect(() => {
    (async () => {
      const hfs = await FS.init();
      await Promise.all(INIT_DIRECTORIES.map(async (dir) => {
        if (!await hfs.isDirectory?.(dir)) {
          await hfs.createDirectory?.(dir);
        }
      }));
    })();
  }, []);
}
