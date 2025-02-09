import {EntryTorrent} from 'media/dir/stacks/entry-torrent';
import type {TorrentCtx} from 'media/dir/types/torrent';

export function DirTorrent({torrent, cmd}: TorrentCtx) {
  return torrent?.list.map((entry, idx) =>
    <EntryTorrent
      key={entry.path}
      opt={{}}
      {...{entry, cmd, idx}}
    />
  );
}
