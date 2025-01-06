import {useState, useEffect} from 'react';
import {getData} from '../utils/data';

import type {FileData, FileFormat} from 'media/file/types';

export function useFileData<Format extends FileFormat>(
  path: string,
  format: Format,
  mimetype = 'application/octet-stream',
): FileData<Format> | undefined {
  const [data, setData] = useState<FileData<Format>>();

  // Retrieve the file data
  useEffect(() => {
    (async () => {
      const _data = await getData(path, format, mimetype);
      if (!_data) return;
      setData(_data);
    })();
  }, [path, format, mimetype]);

  // Revoke the URL if used
  useEffect(() => {
    return () => {
      if (format === 'dataUrl'
        && typeof data === 'string'
        && data.startsWith('blob:')
      ) {
       URL.revokeObjectURL(data);
      }
    }
  }, [format, data]);

  return data;
}
