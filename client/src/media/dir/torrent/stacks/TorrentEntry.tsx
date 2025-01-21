import {useMemo, useRef} from 'react';
import {Pressable} from 'react-native';
import {ListRow} from 'media/stacks/ListRow';

import {useTorrentDnd} from '../hooks/useTorrentDnd';
import {TorrentMenu} from './TorrentMenu';

import type {View} from 'react-native';
import type {TorrentCmd} from '../hooks/useTorrent';
import type {TorrentFileEntry} from '../types';

export interface TorrentEntryProps {
  entry: TorrentFileEntry,
  cmd: TorrentCmd,
  idx: number,
}

export function TorrentEntry(props: TorrentEntryProps) {
  const {entry, cmd} = props;
  const {name, length} = entry;
  const size = length;
  const ref = useRef<View>(null);
  const dnd = useTorrentDnd(entry, cmd, ref);
  
  // States
  const isFile = true;
  const isBlurred = useMemo(() => dnd.isDragging, [dnd.isDragging]);

  // Handlers
  const actions = useMemo(() => ({
    menu: () => {},
    download: () => cmd.download(entry),
  }), [entry, cmd]);

  return (
    <TorrentMenu {...{name, actions}}>
      <Pressable {...{ref, onPress: actions.download}}>
        <ListRow {...{name, size, isFile, isBlurred}}/>
      </Pressable>
    </TorrentMenu>
  );
}
