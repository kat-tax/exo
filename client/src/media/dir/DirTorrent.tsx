import {EntryTorrent} from 'media/dir/EntryTorrent';

import type {DirBaseProps} from 'media/dir';
import type {TorrentInfo, TorrentFileData, TorrentFileEntry} from 'media/utils/torrent';

export interface DirTorrentProps extends DirBaseProps {
  entries: TorrentFileData['files'],
  torrent: TorrentInfo,
  download: (file: TorrentFileEntry) => void,
}

export function DirTorrent({entries, download}: DirTorrentProps) {
  return entries.map(entry =>
    <EntryTorrent key={entry.path} {...{entry, download}}/>
  );
}
