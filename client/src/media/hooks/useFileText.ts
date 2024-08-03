import {fs} from 'react-exo/fs';
import {useState, useEffect} from 'react';

export function useFileText(path: string) {
  const [text, setText] = useState<string>();

  useEffect(() => {
    (async () => {
      const hfs = await fs.init();
      const bytes = await hfs.bytes?.(path);
      if (!bytes) return;
      setText(new TextDecoder('utf-8').decode(bytes));
    })();
  }, [path]);

  return text;
}
