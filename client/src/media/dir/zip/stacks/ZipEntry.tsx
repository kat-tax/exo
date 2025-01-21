import {useMemo, useRef} from 'react';
import {Pressable} from 'react-native';
import {ListRow} from 'media/stacks/ListRow';

import {useZipDnd} from '../hooks/useZipDnd';
import {ZipMenu} from './ZipMenu';

import type {View} from 'react-native';
import type {ZipCmd} from '../hooks/useZip';
import type {ZipEntry as ZipEntryType} from '../types';

export interface ZipEntryProps {
  entry: ZipEntryType,
  cmd: ZipCmd,
  idx: number,
}

export function ZipEntry(props: ZipEntryProps) {
  const {entry, cmd} = props;
  const {name, size, dir} = entry;
  const ref = useRef<View>(null);
  const dnd = useZipDnd(entry, cmd, ref);
  
  // States
  const isFile = !dir;
  const isBlurred = useMemo(() => dnd.isDragging, [dnd.isDragging]);

  // Handlers
  const actions = useMemo(() => ({
    menu: () => {},
    extract: () => cmd.extract(entry),
  }), [entry, cmd]);

  return (
    <ZipMenu {...{name, actions}}>
      <Pressable {...{ref, onPress: actions.extract}}>
        <ListRow {...{name, size, isFile, isBlurred}}/>
      </Pressable>
    </ZipMenu>
  );
}
