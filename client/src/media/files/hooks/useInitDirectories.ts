import {fs} from 'react-exo/fs';
import {useEffect} from 'react';

const INIT_DIRECTORIES = [
  'desktop',
  'documents',
  'downloads',
  'music',
  'pictures',
  'videos',
  'games',
  'books',
];

export function useInitDirectories() {
  useEffect(() => {
    const init = async () => {
      const hfs = await fs.init();
      await Promise.all(INIT_DIRECTORIES.map(async (dir) => {
        if (!await hfs.isDirectory?.(dir)) {
          await hfs.createDirectory?.(dir);
        }
      }));
    }
    init();
  }, []);
}
