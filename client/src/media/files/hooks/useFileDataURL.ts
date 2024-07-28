import {fs} from 'react-exo/fs';
import {useState, useEffect} from 'react';

export function useFileDataURL(path: string, type = 'application/octet-stream') {
  const [dataURL, setDataURL] = useState<string>();
  console.log(path);
  useEffect(() => {
    let url: string | undefined;
    (async () => {
      const hfs = await fs.init();
      const bytes = await hfs.bytes?.(path);
      if (!bytes) return;
      const blob = new Blob([bytes], {type});
      url = URL.createObjectURL(blob);
      setDataURL(url);
    })();
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  }, [path, type]);

  return dataURL;
}
