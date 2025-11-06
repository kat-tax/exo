import {FS} from 'react-exo/fs';
import {useCallback} from 'react';
import {getStartInDir, filterJunkFiles} from 'media/dir/utils/hfs/path';

export function useImportHfs() {
  /** Create a new folder */
  const createFolder = useCallback(async (path: string) => {
    const fs = await FS.init('local');
    await fs?.createDirectory?.(path);
  }, []);

  /** Import a folder from the device */
  const importFolder = useCallback(async (path = '') => {
    const startIn = getStartInDir(path);
    const timer = performance.now();
    const files = await FS.pickDirectory({startIn});
    await FS.importFiles(path, filterJunkFiles(files));
    console.log('>> fs [imported folder]', files, performance.now() - timer);
  }, []);

  /** Import a file from the device */
  const importFile = useCallback(async (path = '') => {
    const startIn = getStartInDir(path);
    const timer = performance.now();
    const from = await FS.pick({startIn, multiple: true});
    await FS.importFiles(path, filterJunkFiles(from));
    console.log('>> fs [imported files]', from, performance.now() - timer);
  }, []);

  return {createFolder, importFolder, importFile};
}
