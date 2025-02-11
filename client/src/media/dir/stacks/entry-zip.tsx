import {Touch} from 'app/stacks/touch';
import {ListRow} from 'media/stacks/list/row';
import {MenuZip} from 'media/dir/stacks/menu-zip';
import {useEntryZip} from 'media/dir/hooks/use-entry-zip';

import type {ZipFileEntry, ZipCmd} from 'media/dir/types/zip';

export interface EntryZipProps {
  item: ZipFileEntry,
  cmd: ZipCmd,
  opt: {dragging?: boolean},
}

export function EntryZip(props: EntryZipProps) {
  const {item} = props;
  const {name, size, dir} = item;
  const {ext, cmd, opt, ref} = useEntryZip(props);

  return (
    <Touch
      refs={ref}
      onPress={cmd.extract}
      onDoublePress={dir ? cmd.extract : undefined}>
      <MenuZip {...{item, cmd, on: open => open && ref[0]?.current?.focus()}}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </MenuZip>
    </Touch>
  );
}
