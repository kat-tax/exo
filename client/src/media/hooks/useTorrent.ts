import {useMemo} from 'react';
import {info, files} from 'media/utils/torrent';
import {useDataArrayBuffer} from 'media/hooks/useDataArrayBuffer';

export function useTorrent(path: string) {
  const torrent = useDataArrayBuffer(path);
  return useMemo(() => {
    if (!torrent) return null;
    const array = new Uint8Array(torrent);
    return {
      info: info(array),
      data: files(array),
    };
  }, [torrent]);
}
