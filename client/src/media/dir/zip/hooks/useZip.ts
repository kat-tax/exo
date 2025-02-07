import {fs} from '@zip.js/zip.js';
import {useDispatch} from 'react-redux';
import {useCallback, useEffect, useState, useRef} from 'react';
import {useLocationPathInfo} from 'app/hooks/useCurrentPathInfo';
import {useFileData} from 'media/file/hooks/useFileData';
import {toPathInfo} from 'app/utils/formatting';
import media from 'media/store';

import type {FS} from '@zip.js/zip.js';
import type {Zip, ZipCtx, ZipFileEntry} from '../types';
import type {GestureResponderEvent} from 'react-native';

export function useZip(path: string): ZipCtx {
  const [zip, setZip] = useState<Zip | null>(null);
  const {path: url} = useLocationPathInfo();
  const buffer = useFileData(path, 'arrayBuffer');
  const zipfs = useRef<FS | null>(null);
  const put = useDispatch();

  const extract = useCallback(async (file: ZipFileEntry, evt?: GestureResponderEvent) => {
    if (!zip) return;
    const source = zipfs.current?.getById(file.id);
    if (!source) return;
    const {name, ext} = toPathInfo(file.name, false);
    const filename = `${name}.${ext}`;
    // TODO: move write logic to hfs so recursive mkdir works
    // const dest = path ? `${path}/${filename}` : filename;
    const dest = filename;
    const folder = await navigator.storage.getDirectory();
    const handle = await folder.getFileHandle(dest, {create: true});
    const writable = await handle.createWritable();
    // @ts-ignore
    source?.getData({writable});
    // Open file on gesture event
    if (evt) {
      const [isShift, isCtrl] = [evt?.shiftKey, evt?.metaKey || evt?.ctrlKey];
      put(media.actions.selectItem({
        path: url ? `${url}/${filename}` : filename,
        isRange: isShift ?? false,
        isMulti: isCtrl ?? false,
      }));
    }
  }, [zip, url]);

  useEffect(() => {
    (async () => {
      if (!buffer) return;
      const _fs = new fs.FS();
      const _view = new Uint8Array(buffer);
      const _zip = await _fs.importUint8Array(_view);
      zipfs.current = _fs;
      setZip({
        date: {
          created: _zip?.[0]?.data?.creationDate,
          modified: _zip?.[0]?.data?.lastModDate,
          accessed: _zip?.[0]?.data?.lastAccessDate,
        },
        size: {
          compressed: _zip?.reduce((acc, entry) => acc + (entry.data?.compressedSize ?? 0), 0) ?? 0,
          uncompressed: _zip?.reduce((acc, entry) => acc + (entry.data?.uncompressedSize ?? 0), 0) ?? 0,
        },
        list: _zip
          .filter(entry =>{
            const path = entry.getFullname();
            return !path.startsWith('__MACOSX');
          })
          .map(entry => ({
            id: entry.id,
            name: entry.data?.rawFilename ? new TextDecoder().decode(entry.data?.rawFilename) : entry.name,
            size: entry.data?.uncompressedSize ?? 0,
            ext: entry.name.split('.').pop() ?? '',
            dir: entry.data?.directory ?? false,
          }))
          .filter(Boolean),
      });
    })();
  }, [buffer]);

  return {zip, cmd: {extract}};
}
