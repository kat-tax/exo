import {FS} from 'react-exo/fs';
import {useCallback} from 'react';
import {useLocation} from 'react-exo/navigation';
import {resolve, getStartInDir} from 'media/utils/path';

export function useHfsImporter() {
  const {pathname} = useLocation();

  /** Import a folder from the device */
  const importFolder = useCallback(async () => {
    console.log('>> importFolder', resolve(pathname));
    const pathParts = resolve(pathname);
    const perfStart = performance.now();
    const startIn = getStartInDir(pathParts[0]);
    const dir = await FS.openDirectory({id: pathParts[0], startIn, mode: 'read'});
    const copy = await FS.importDirectory(dir, pathParts.join('/'));
    console.log('[fs] import dir', dir, copy, performance.now() - perfStart);
  }, [pathname]);

  /** Import a file from the device */
  const importFile = useCallback(async () => {
    console.log('>> importFile', resolve(pathname));
    const perfStart = performance.now();
    const file = await FS.openFile();
    const copy = await FS.importFile(file);
    console.log('[fs] import file', file, copy, performance.now() - perfStart);
  }, [pathname]);

  return {importFolder, importFile};
}
