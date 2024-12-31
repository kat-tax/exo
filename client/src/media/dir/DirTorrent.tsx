import {EntryTorrent} from 'media/dir/EntryTorrent';
import type {Torrent} from 'media/hooks/useFileTorrent';
import type {TorrentFileEntry} from 'media/utils/torrent';

export interface DirTorrentProps {
  torrent: Torrent,
  download: (file: TorrentFileEntry) => void,
}

export function DirTorrent({torrent, download}: DirTorrentProps) {
  return torrent.list.map((entry, index) =>
    <EntryTorrent
      key={entry.path}
      {...{entry, index, download}}
    />
  );
}
