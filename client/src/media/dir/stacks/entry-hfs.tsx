import {Touch} from 'app/stacks/touch';
import {ListRow} from 'media/stacks/list/row';
import {MenuHfs} from 'media/dir/stacks/menu-hfs';
import {useEntryHfs} from 'media/dir/hooks/use-entry-hfs';

import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsCmd, HfsOpt} from 'media/dir/types/hfs';

export interface EntryHfsProps {
  entry: HfsDirectoryEntry,
  cmd: HfsCmd,
  opt: HfsOpt,
  idx: number,
}

export function EntryHfs(props: EntryHfsProps) {
  const {entry} = props;
  const {name, size, isFile} = entry;
  const {ref, ext, cmd, opt} = useEntryHfs(props);
  const dir = !isFile;
  return (
    <Touch
      dragRef={ref}
      onPress={cmd.select}
      onDoublePress={dir ? () => cmd.open(true) : undefined}>
      <MenuHfs {...{entry, cmd, on: open => open && cmd.select()}}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </MenuHfs>
    </Touch>
  );
}
