import {TorrentEntry} from './torrent-entry';
import type {TorrentCtx} from '../types';

export function TorrentDir({torrent, cmd}: TorrentCtx) {
  return torrent?.list.map((entry, idx) =>
    <TorrentEntry
      key={entry.path}
      opt={{}}
      {...{entry, cmd, idx}}
    />
  );
}
