import {TorrentEntry} from './TorrentEntry';
import type {Torrent} from '../hooks/useTorrent';
import type {TorrentFileEntry} from '../types';

export interface TorrentDirProps {
  torrent: Torrent,
  download: (file: TorrentFileEntry) => void,
}

export function TorrentDir({torrent, download}: TorrentDirProps) {
  return torrent.list.map((entry: TorrentFileEntry, idx: number) =>
    <TorrentEntry
      key={entry.path}
      {...{entry, download, idx}}
    />
  );
}
