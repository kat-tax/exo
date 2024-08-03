import {fs} from 'react-exo/fs';
import {useState, useEffect} from 'react';

import type {HfsImpl} from 'react-exo/fs';

export function useFileSystem() {
  const [hfs, setHfs] = useState<HfsImpl>();

  useEffect(() => {
    fs?.init?.().then(setHfs);
  }, []);

  return hfs;
}
