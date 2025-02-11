import {List} from 'media/stacks/list';
import {EntryTorrent} from 'media/dir/stacks/entry-torrent';
import type {TorrentCtx} from 'media/dir/types/torrent';

export function DirTorrent({torrent, cmd}: TorrentCtx) {
  return (
    <List
      list={torrent?.list}
      render={({item}) => <EntryTorrent {...{item, cmd, opt: {}}}/>}
    />
  );
}
