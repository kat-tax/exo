import {Touch} from 'app/stacks/touch';
import {ListRow} from 'media/stacks/list-row';
import {ZipMenu} from './zip-menu';
import {useZipEntry} from '../hooks/use-zip-entry';

import type {ZipFileEntry, ZipCmd} from '../types';

export interface ZipEntryProps {
  entry: ZipFileEntry,
  cmd: ZipCmd,
  opt: {dragging?: boolean},
  idx: number,
}

export function ZipEntry(props: ZipEntryProps) {
  const {entry} = props;
  const {name, size, dir} = entry;
  const {ref, ext, cmd, opt} = useZipEntry(props);
  return (
    <Touch
      dragRef={ref}
      onPress={cmd.extract}
      onDoublePress={dir ? cmd.extract : undefined}>
      <ZipMenu {...{entry, cmd}}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </ZipMenu>
    </Touch>
  );
}
