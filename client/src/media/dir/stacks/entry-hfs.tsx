import {Touch} from 'app/stacks/touch';
import {ListRow} from 'media/stacks/list/row';
import {MenuHfs} from 'media/dir/stacks/menu-hfs';
import {useEntryHfs} from 'media/dir/hooks/use-entry-hfs';

import type {HfsCmd, HfsOpt, HfsFileEntry} from 'media/dir/types/hfs';

export interface EntryHfsProps {
  item: HfsFileEntry,
  cmd: HfsCmd,
  opt: HfsOpt,
}

export function EntryHfs(props: EntryHfsProps) {
  const {item} = props;
  const {name, size, isFile} = item;
  const {ext, cmd, opt, ref, foc} = useEntryHfs(props);
  const dir = !isFile;

  return (
    <Touch
      refs={ref}
      onPress={cmd.select}
      onDoublePress={dir ? () => cmd.open(true) : undefined}>
      <MenuHfs {...{item, cmd}} on={() => foc()}>
        <ListRow {...{name, size, ext, dir, opt}} img={cmd.thumbnail}/>
      </MenuHfs>
    </Touch>
  );
}
