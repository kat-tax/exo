import {useCallback} from 'react';
import {fs} from 'react-exo/fs';

export function useFileSystem() {
  const test = useCallback(async () => {
    const start = performance.now();
    const file = await fs.openFile();
    const hash = await fs.hashFile(file, (bytes, total) => {
      console.log('[fs] progress', (bytes / total) * 100);
    });
    console.log('[fs] hash', hash);
    console.log('[fs] time', performance.now() - start);
  }, []);

  return {
    test,
  };
}
