import {useState, useEffect} from 'react';
import {FS} from 'react-exo/fs';

import type {HfsImpl} from 'react-exo/fs';

export function useDeviceFileSystem() {
  const [fs, setFS] = useState<HfsImpl | null>(null);
  useEffect(() => {(async () => {
    const fs = await FS.init('fs');
    setFS(fs);
  })();
  }, []);
  return fs;
}
