import {TorrentEntry} from './TorrentEntry';
import type {Torrent} from './hooks/useTorrent';
import type {TorrentFileEntry} from 'media/utils/torrent';

export interface TorrentDirProps {
  torrent: Torrent,
  download: (file: TorrentFileEntry) => void,
}

export function TorrentDir({torrent, download}: TorrentDirProps) {
  return torrent.list.map((entry: TorrentFileEntry, index: number) =>
    <TorrentEntry
      key={entry.path}
      {...{entry, index, download}}
    />
  );
}
