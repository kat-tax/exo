import {useCallback} from 'react';
import {fs} from 'react-exo/fs';

export function useFileSystem() {
  const importFolder = useCallback(async () => {
    const folder = await fs.openFolder();
    console.log('[fs] folder', folder);
    const start = performance.now();
    const copy = await fs.importFolder(folder);
    console.log('[fs] import folder', copy, performance.now() - start);
  }, []);

  const importFile = useCallback(async () => {
    const file = await fs.openFile();
    console.log('[fs] file', file);
    const start = performance.now();
    const copy = await fs.importFile(file);
    console.log('[fs] import file', copy, performance.now() - start);
  }, []);

  const hashFile = useCallback(async () => {
    const file = await fs.openFile();
    console.log('[fs] file', file);
    const start = performance.now();
    const hash = await fs.hashFile(file, (bytes, total) => {
      console.log('[fs] hashing', (bytes / total) * 100);
    });
    console.log('[fs] hash', hash, performance.now() - start);
  }, []);

  return {
    importFolder,
    importFile,
    hashFile,
  };
}
