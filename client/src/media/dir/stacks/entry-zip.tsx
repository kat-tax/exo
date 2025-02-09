import {Touch} from 'app/stacks/touch';
import {ListRow} from 'media/stacks/list/row';
import {MenuZip} from 'media/dir/stacks/menu-zip';
import {useEntryZip} from 'media/dir/hooks/use-entry-zip';

import type {ZipFileEntry, ZipCmd} from 'media/dir/types/zip';

export interface EntryZipProps {
  entry: ZipFileEntry,
  cmd: ZipCmd,
  opt: {dragging?: boolean},
  idx: number,
}

export function EntryZip(props: EntryZipProps) {
  const {entry} = props;
  const {name, size, dir} = entry;
  const {ref, ext, cmd, opt} = useEntryZip(props);
  return (
    <Touch
      dragRef={ref}
      onPress={cmd.extract}
      onDoublePress={dir ? cmd.extract : undefined}>
      <MenuZip {...{entry, cmd}}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </MenuZip>
    </Touch>
  );
}
