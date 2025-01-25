import {TouchableOpacity} from 'react-native';
import {ListRow} from 'media/stacks/ListRow';
import {HfsMenu} from './HfsMenu';
import {useHfsEntry} from '../hooks/useHfsEntry';

import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsCmd} from '../types';

export interface HfsEntryProps {
  entry: HfsDirectoryEntry,
  cmd: HfsCmd,
  idx: number,
  opt: {
    selected: boolean,
  },
}

export function HfsEntry(props: HfsEntryProps) {
  const {entry} = props;
  const {name, size, isFile} = entry;
  const {ref, ext, cmd, opt} = useHfsEntry(props);
  const dir = !isFile;
  return (
    <TouchableOpacity onPress={cmd.select} {...{ref, activeOpacity: 0.6}}>
      <HfsMenu {...{entry, cmd}}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </HfsMenu>
    </TouchableOpacity>
  );
}
