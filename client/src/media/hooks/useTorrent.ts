import {useMemo} from 'react';
import {info, files} from 'media/utils/torrent';

export function useTorrent(torrent?: ArrayBuffer) {
  return useMemo(() => {
    if (!torrent) return null;
    const array = new Uint8Array(torrent);
    return {
      info: info(array),
      data: files(array),
    };
  }, [torrent]);
}
