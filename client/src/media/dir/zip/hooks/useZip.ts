import {fs} from '@zip.js/zip.js';
import {useCallback, useEffect, useState, useRef} from 'react';
import {useFileData} from 'media/file/hooks/useFileData';

import type {FS} from '@zip.js/zip.js';
import type {Zip} from '../types';

export function useZip(path: string) {
  const filesystem = useRef<FS | null>(null);
  const buffer = useFileData(path, 'arrayBuffer');
  const [zip, setZip] = useState<Zip | null>(null);

  useEffect(() => {
    (async () => {
      if (!buffer) return;
      const _fs = new fs.FS();
      const _view = new Uint8Array(buffer);
      const _zip = await _fs.importUint8Array(_view);
      filesystem.current = _fs;
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
        list: _zip.filter(entry => !entry.getFullname().startsWith('__MACOSX')).map(entry => {
          return {
            id: entry.id,
            name: entry.data?.rawFilename ? new TextDecoder().decode(entry.data?.rawFilename) : entry.name,
            size: entry.data?.uncompressedSize ?? 0,
            ext: entry.name.split('.').pop() ?? '',
            dir: entry.data?.directory ?? false,
          }
        }).filter(Boolean),
      });
    })();
  }, [buffer]);

  const extract = useCallback(async (file: Zip['list'][number]) => {
    if (!zip) return;
    const source = filesystem.current?.getById(file.id);
    if (!source) return;
    const folder = await navigator.storage.getDirectory();
    const handle = await folder.getFileHandle(file.name.split('/').pop() ?? file.name, {create: true});
    const writable = await handle.createWritable();
    // @ts-ignore
    source?.getData({writable});
  }, [zip]);

  return {zip, extract};
}
