import {TorrentEntry} from './TorrentEntry';
import type {TorrentCtx} from '../hooks/useTorrent';

export function TorrentDir({torrent, cmd}: TorrentCtx) {
  return torrent?.list.map((entry, idx) =>
    <TorrentEntry
      key={entry.path}
      {...{entry, cmd, idx}}
    />
  );
}
