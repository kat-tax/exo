import {useState, useEffect} from 'react';
import {getFileBlob} from 'media/utils/file';

export function useDataUrl(path: string, mimetype = 'application/octet-stream') {
  const [dataURL, setDataURL] = useState<string>();

  useEffect(() => {
    let url: string | undefined;
    (async () => {
      const blob = await getFileBlob(path, mimetype);
      if (!blob) return;
      url = URL.createObjectURL(blob);
      console.log('url', url);
      setDataURL(url);
    })();
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  }, [path, mimetype]);

  return dataURL;
}
