import {useMemo} from 'react';
import {Pressable} from 'react-native';
import {ListRow} from 'media/stacks/ListRow';

import {TorrentMenu} from './TorrentMenu';
import type {TorrentFileEntry} from '../types';

export interface TorrentEntryProps {
  entry: TorrentFileEntry,
  index: number,
  download: (entry: TorrentFileEntry) => void,
}

export function TorrentEntry(props: TorrentEntryProps) {
  const {entry} = props;
  const {name, length} = entry;
  const size = length;
  const isFile = true;

  // Handlers for menu actions
  const actions = useMemo(() => ({
    menu: () => {},
    download: () => props.download(entry),
  }), [props.download, entry]);

  return (
    <TorrentMenu {...{name, actions}}>
      <Pressable onPress={actions.download}>
        <ListRow {...{name, size, isFile}}/>
      </Pressable>
    </TorrentMenu>
  );
}
