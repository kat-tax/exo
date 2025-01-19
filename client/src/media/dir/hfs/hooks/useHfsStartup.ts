import {useEffect} from 'react';
import {useAppContext} from 'app/hooks/useAppContext';
import {INIT_DIRECTORIES} from '../utils/path';

export function useHfsStartup() {
  const {filesystem} = useAppContext();
  useEffect(() => {
    (async () => {
      if (!filesystem) return;
      await Promise.all(INIT_DIRECTORIES.map(async (dir) => {
        if (!(await filesystem.isDirectory?.(dir))) {
          await filesystem.createDirectory?.(dir);
        }
      }));
    })();
  }, [filesystem]);
}
