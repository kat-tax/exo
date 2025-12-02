import {Touch} from 'app/ui/touch';
import {ListRow} from 'media/stacks/list/row';
import {MenuHfs} from 'media/dir/stacks/menu-hfs';
import {useEntryHfs} from 'media/dir/hooks/use-entry-hfs';

import type {Hfs, HfsCmd, HfsOpt, HfsFileEntry} from 'media/dir/types/hfs';

export interface EntryHfsProps {
  index: number,
  item: HfsFileEntry,
  cmd: HfsCmd,
  opt: HfsOpt,
  dir: Hfs,
}

export function EntryHfs(props: EntryHfsProps) {
  const {item} = props;
  const {name, size, isFile} = item;
  const {ext, cmd, opt, ref, foc} = useEntryHfs(props);
  const dir = !isFile;

  return (
    <Touch
      refs={ref}
      onPress={(e) => {foc(); cmd.select(e)}}
      onDoublePress={dir ? () => cmd.open(true) : undefined}>
      <MenuHfs {...{item, cmd}} on={() => foc()}>
        <ListRow
          {...{name, size, ext, dir, opt}}
          img={cmd.thumbnail}
          onRename={cmd.rename}
        />
      </MenuHfs>
    </Touch>
  );
}
