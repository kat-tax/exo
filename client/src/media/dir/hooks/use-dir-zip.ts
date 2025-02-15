import {fs} from '@zip.js/zip.js';
import {web} from 'react-exo/fs';
import {useCallback, useEffect, useState, useRef} from 'react';
import {usePath} from 'app/hooks/use-path';
import {usePut} from 'app/data/store';
import {useFile} from 'media/file/hooks/use-file';
import {toPath} from 'app/utils/formatting';
import media from 'media/store';

import type {FS} from '@zip.js/zip.js';
import type {Zip, ZipCtx, ZipFileEntry} from 'media/dir/types/zip';
import type {GestureResponderEvent} from 'react-native';
import type {HfsDirectoryEntry} from 'react-exo/fs';

export function useDirZip(path: string): ZipCtx {
  const [zip, setZip] = useState<Zip | null>(null);
  const {path: url} = usePath();
  const buffer = useFile(path, 'arrayBuffer');
  const zipfs = useRef<FS | null>(null);
  const put = usePut();

  const extract = useCallback(async (
    file: ZipFileEntry,
    event?: GestureResponderEvent,
    target?: HfsDirectoryEntry,
  ) => {
    if (!zip) return;
    const source = zipfs.current?.getById(file.id);
    if (!source) return;
    const {name, ext} = toPath(file.name, false);
    const {name: zdir} = toPath(path, false); // TODO: only for extract all
    const root = url ? `${url}/` : '';
    const head = target?.name ? `${target.name}/` : '';
    const tail = false && zdir ? `${zdir}/` : ''; // TODO: this is for extract all
    const dest = `${root}${head}${tail}${name}.${ext}`;
    const handle = await web.getFileHandle(dest, {create: true});
    const writable = await handle?.createWritable();
    if (!writable) return;
    // @ts-expect-error TS missing types
    source?.getData({writable});
    console.log('>> zip [extract]', file.name, '->', dest);
    // Open file on gesture event
    if (event) {
      const [isShift, isCtrl] = [
        event?.shiftKey,
        event?.metaKey || event?.ctrlKey,
      ];
      put(media.actions.selectItem({
        path: dest,
        isRange: isShift ?? false,
        isMulti: isCtrl ?? false,
        namespace: 'temp',
      }));
    }
  }, [zip, url, path, put]);

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
