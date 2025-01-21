import {Pressable} from 'react-native';
import {ListRow} from 'media/stacks/ListRow';
import {ZipMenu} from './ZipMenu';
import {useZipEntry} from '../hooks/useZipEntry';

import type {ZipFileEntry, ZipCmd} from '../types';

export interface ZipEntryProps {
  entry: ZipFileEntry,
  cmd: ZipCmd,
  idx: number,
  opt: {
    selected: boolean,
  },
}

export function ZipEntry(props: ZipEntryProps) {
  const {entry} = props;
  const {name, size, dir} = entry;
  const {ref, ext, cmd, opt} = useZipEntry(props);
  return (
    <ZipMenu {...{entry, cmd}}>
      <Pressable {...{ref}} onPress={cmd.extract}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </Pressable>
    </ZipMenu>
  );
}
