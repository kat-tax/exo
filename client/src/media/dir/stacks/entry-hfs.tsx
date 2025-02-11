import {Touch} from 'app/stacks/touch';
import {ListRow} from 'media/stacks/list/row';
import {MenuHfs} from 'media/dir/stacks/menu-hfs';
import {useEntryHfs} from 'media/dir/hooks/use-entry-hfs';

import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsCmd, HfsOpt} from 'media/dir/types/hfs';

export interface EntryHfsProps {
  item: HfsDirectoryEntry,
  cmd: HfsCmd,
  opt: HfsOpt,
}

export function EntryHfs(props: EntryHfsProps) {
  const {item} = props;
  const {name, size, isFile} = item;
  const {ref, ext, cmd, opt} = useEntryHfs(props);
  const dir = !isFile;

  return (
    <Touch
      dragRef={ref}
      onPress={cmd.select}
      onDoublePress={dir ? () => cmd.open(true) : undefined}>
      <MenuHfs {...{item, cmd, on: open => open && ref.current?.focus()}}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </MenuHfs>
    </Touch>
  );
}
