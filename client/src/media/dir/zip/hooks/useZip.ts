import {fs} from '@zip.js/zip.js';
import {useCallback, useEffect, useState, useRef} from 'react';
import {useFileData} from 'media/file/hooks/useFileData';
import {toPathInfo} from 'app/utils/formatting';

import type {FS} from '@zip.js/zip.js';
import type {Zip, ZipEntry} from '../types';

export type ZipCtx = {
  zip: Zip | null,
  cmd: ZipCmd,
};

export type ZipCmd = {
  extract: (entry: ZipEntry, path?: string) => void,
};

export function useZip(path: string): ZipCtx {
  const [zip, setZip] = useState<Zip | null>(null);
  const zipfs = useRef<FS | null>(null);
  const buffer = useFileData(path, 'arrayBuffer');

  const extract = useCallback(async (file: ZipEntry, path?: string) => {
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
  }, [zip]);

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
