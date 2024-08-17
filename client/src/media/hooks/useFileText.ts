import {useState, useEffect} from 'react';
import {getFileText} from 'media/utils/file';

export function useFileText(path: string) {
  const [text, setText] = useState<string>();

  useEffect(() => {
    (async () => {
      const text = await getFileText(path);
      if (!text) return;
      setText(text);
    })();
  }, [path]);

  return text;
}
