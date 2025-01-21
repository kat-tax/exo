import {Pressable} from 'react-native';
import {ListRow} from 'media/stacks/ListRow';
import {TorrentMenu} from './TorrentMenu';
import {useTorrentEntry} from '../hooks/useTorrentEntry';

import type {TorrentFileEntry, TorrentCmd} from '../types';

export interface TorrentEntryProps {
  entry: TorrentFileEntry,
  cmd: TorrentCmd,
  idx: number,
  opt: {
    selected: boolean,
  },
}

export function TorrentEntry(props: TorrentEntryProps) {
  const {entry} = props;
  const {name, length} = entry;
  const {ref, ext, cmd, opt} = useTorrentEntry(props);
  const size = length;
  const dir = false;
  return (
    <TorrentMenu {...{entry, cmd}}>
      <Pressable {...{ref}} onPress={cmd.download}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </Pressable>
    </TorrentMenu>
  );
}
