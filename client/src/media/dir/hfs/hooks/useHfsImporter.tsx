import {FS} from 'react-exo/fs';
import {useLocation} from 'react-exo/navigation';
import {useCallback, useMemo} from 'react';
import {resolve, getStartInDir} from '../utils/path';

export function useHfsImporter() {
  const {pathname} = useLocation();
  const {parts, startIn} = useMemo(() => {
    const parts = resolve(pathname);
    const startIn = getStartInDir(parts[0]);
    return {startIn, parts};
  }, [pathname]);

  /** Import a folder from the device */
  const importFolder = useCallback(async () => {
    const timer = performance.now();
    const from = await FS.openDirectory({id: parts[0], startIn});
    const to = await FS.importDirectory(from, parts.join('/'));
    console.log('>> fs [import dir]', from, to, performance.now() - timer);
  }, [parts, startIn]);

  /** Import a file from the device */
  const importFile = useCallback(async () => {
    const timer = performance.now();
    const from = await FS.openFile({id: parts[0], startIn, multiple: true});
    const to = await FS.importFile(from);
    console.log('>> fs [import file]', from, to, performance.now() - timer);
  }, [parts, startIn]);

  return {importFolder, importFile};
}
