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
  const {ext, cmd, opt, ref, foc} = useEntryZip(props);

  return (
    <Touch
      refs={ref}
      onPress={cmd.extract}>
      <MenuZip {...{item, cmd}} on={() => foc()}>
        <ListRow {...{name, size, ext, dir, opt, tmp: true}}/>
      </MenuZip>
    </Touch>
  );
}
