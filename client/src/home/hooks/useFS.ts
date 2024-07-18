import {useMemo} from 'react';
import {WebHfs} from 'react-exo/fs';

export function useFS() {
  const fs = useMemo(async () => {
    console.log('[fs] init');
    const root = await navigator.storage.getDirectory();
    return new WebHfs({root});
  }, []);

  return fs;
}
