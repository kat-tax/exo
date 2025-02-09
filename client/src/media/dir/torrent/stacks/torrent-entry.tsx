import {Touch} from 'app/stacks/touch';
import {ListRow} from 'media/stacks/list-row';

import {TorrentMenu} from './torrent-menu';
import {useTorrentEntry} from '../hooks/useTorrentEntry';

import type {TorrentFileEntry, TorrentCmd} from '../types';

export interface TorrentEntryProps {
  entry: TorrentFileEntry,
  cmd: TorrentCmd,
  opt: {dragging?: boolean},
  idx: number,
}

export function TorrentEntry(props: TorrentEntryProps) {
  const {entry} = props;
  const {name, length} = entry;
  const {ref, ext, cmd, opt} = useTorrentEntry(props);
  const size = length;
  const dir = false;
  return (
    <Touch
      dragRef={ref}
      onPress={cmd.download}
      onDoublePress={dir ? cmd.download : undefined}>
      <TorrentMenu {...{entry, cmd}}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </TorrentMenu>
    </Touch>
  );
}
