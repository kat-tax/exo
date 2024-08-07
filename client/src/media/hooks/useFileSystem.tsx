import {useCallback} from 'react';
import {fs} from 'react-exo/fs';

import type {OpenDirectoryOptions} from 'react-exo/fs';

export function useFileSystem() {
  const getOpenDirectoryInit = useCallback((path: string) => {
    let startIn: OpenDirectoryOptions['startIn'];
    switch (path) {
      case 'documents': startIn = 'documents'; break;
      case 'pictures': startIn = 'pictures'; break;
      case 'videos': startIn = 'videos'; break;
      case 'music': startIn = 'music'; break;
      case 'downloads': startIn = 'downloads'; break;
      default: startIn = 'desktop';
    }
    return startIn;
  }, []);

  const importDirectory = useCallback(async (path = '.') => {
    const startIn = getOpenDirectoryInit(path);
    const dir = await fs.openDirectory({id: path, startIn, mode: 'read'});
    const start = performance.now();
    const copy = await fs.importDirectory(dir, path);
    console.log('[fs] import dir', copy, performance.now() - start);
  }, [getOpenDirectoryInit]);

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
    getOpenDirectoryInit,
    importDirectory,
    importFile,
    hashFile,
  };
}

