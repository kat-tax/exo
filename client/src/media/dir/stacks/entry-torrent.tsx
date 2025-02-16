import {Touch} from 'app/stacks/touch';
import {ListRow} from 'media/stacks/list/row';
import {MenuTorrent} from 'media/dir/stacks/menu-torrent';
import {useEntryTorrent} from 'media/dir/hooks/use-entry-torrent';

import type {TorrentFileEntry, TorrentCmd} from 'media/dir/types/torrent';

export interface EntryTorrentProps {
  item: TorrentFileEntry,
  cmd: TorrentCmd,
  opt: {dragging?: boolean},
}

export function EntryTorrent(props: EntryTorrentProps) {
  const {item} = props;
  const {name, length} = item;
  const {ext, cmd, opt, ref, foc} = useEntryTorrent(props);
  const size = length;
  const dir = false;

  return (
    <Touch
      refs={ref}
      onPress={cmd.download}>
      <MenuTorrent {...{item, cmd}} on={() => foc()}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </MenuTorrent>
    </Touch>
  );
}
