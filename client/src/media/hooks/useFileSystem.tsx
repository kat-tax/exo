import {fs} from 'react-exo/fs';
import {useCallback} from 'react';
import {getStartInDir} from 'media/utils/path';

export function useFileSystem() {
  const importFile = useCallback(async () => {
    const perfStart = performance.now();
    const file = await fs.openFile();
    const copy = await fs.importFile(file);
    console.log('[fs] import file', file, copy, performance.now() - perfStart);
  }, []);

  const importDirectory = useCallback(async (path = '.') => {
    const perfStart = performance.now();
    const startIn = getStartInDir(path);
    const dir = await fs.openDirectory({id: path, startIn, mode: 'read'});
    const copy = await fs.importDirectory(dir, path);
    console.log('[fs] import dir', dir, copy, performance.now() - perfStart);
  }, []);

  return {
    importFile,
    importDirectory,
  };
}
