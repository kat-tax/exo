import {List} from 'media/stacks/list';
import {EntryTorrent} from 'media/dir/stacks/entry-torrent';
import type {TorrentCtx, TorrentOpt} from 'media/dir/types/torrent';

export function DirTorrent({torrent, cmd}: TorrentCtx) {
  return (
    <List
      items={torrent?.list}
      opts={{layout: 'grid', preview: true}}
      render={({item}) => {
        const opt: Partial<TorrentOpt> = {
          layout: 'grid',
          preview: true,
        };
        return <EntryTorrent {...{item, cmd, opt}}/>;
      }}
    />
  );
}
