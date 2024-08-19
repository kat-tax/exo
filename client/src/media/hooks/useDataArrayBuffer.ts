import {useState, useEffect} from 'react';
import {getFileArrayBuffer} from 'media/utils/file';

export function useDataArrayBuffer(path: string) {
  const [data, setData] = useState<ArrayBuffer>();

  useEffect(() => {
    let url: string | undefined;
    (async () => {
      const blob = await getFileArrayBuffer(path);
      if (!blob) return;
      setData(blob);
    })();
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  }, [path]);

  return data;
}
