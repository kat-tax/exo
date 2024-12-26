import {FS} from 'react-exo/fs';
import {useCallback} from 'react';
import {getStartInDir} from 'media/utils/path';

export function useImporter() {
  /** Import a folder from the device */
  const importFolder = useCallback(async (path = '.') => {
    const perfStart = performance.now();
    const startIn = getStartInDir(path);
    const dir = await FS.openDirectory({id: path, startIn, mode: 'read'});
    const copy = await FS.importDirectory(dir, path);
    console.log('[fs] import dir', dir, copy, performance.now() - perfStart);
  }, []);

  /** Import a file from the device */
  const importFile = useCallback(async () => {
    const perfStart = performance.now();
    const file = await FS.openFile();
    const copy = await FS.importFile(file);
    console.log('[fs] import file', file, copy, performance.now() - perfStart);
  }, []);

  return {importFolder, importFile};
}
