import {Touch} from 'app/stacks/touch';
import {ListRow} from 'media/stacks/list/row';
import {MenuTorrent} from 'media/dir/stacks/menu-torrent';
import {useEntryTorrent} from 'media/dir/hooks/use-entry-torrent';

import type {TorrentFileEntry, TorrentCmd} from 'media/dir/types/torrent';

export interface EntryTorrentProps {
  entry: TorrentFileEntry,
  cmd: TorrentCmd,
  opt: {dragging?: boolean},
  idx: number,
}

export function EntryTorrent(props: EntryTorrentProps) {
  const {entry} = props;
  const {name, length} = entry;
  const {ref, ext, cmd, opt} = useEntryTorrent(props);
  const size = length;
  const dir = false;
  return (
    <Touch
      dragRef={ref}
      onPress={cmd.download}
      onDoublePress={dir ? cmd.download : undefined}>
      <MenuTorrent {...{entry, cmd}}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </MenuTorrent>
    </Touch>
  );
}
