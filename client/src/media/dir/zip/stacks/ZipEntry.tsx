import {PointerEvent} from 'app/stacks/PointerEvent';
import {ListRow} from 'media/stacks/ListRow';
import {ZipMenu} from './ZipMenu';
import {useZipEntry} from '../hooks/useZipEntry';

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
    <PointerEvent
      dragRef={ref}
      onPress={cmd.extract}
      onDoublePress={dir ? cmd.extract : undefined}>
      <ZipMenu {...{entry, cmd}}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </ZipMenu>
    </PointerEvent>
  );
}
