import {fs} from 'react-exo/fs';
import {useEffect} from 'react';
import {INIT_DIRECTORIES} from 'media/utils/path';

export function useInitializer() {
  useEffect(() => {
    (async () => {
      const hfs = await fs.init();
      await Promise.all(INIT_DIRECTORIES.map(async (dir) => {
        if (!await hfs.isDirectory?.(dir)) {
          await hfs.createDirectory?.(dir);
        }
      }));
    })();
  }, []);
}
