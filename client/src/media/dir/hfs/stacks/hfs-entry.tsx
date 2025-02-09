import {Touch} from 'app/stacks/touch';
import {ListRow} from 'media/stacks/list-row';
import {HfsMenu} from './hfs-menu';
import {useHfsEntry} from '../hooks/useHfsEntry';

import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsCmd, HfsOpt} from '../types';

export interface HfsEntryProps {
  entry: HfsDirectoryEntry,
  cmd: HfsCmd,
  opt: HfsOpt,
  idx: number,
}

export function HfsEntry(props: HfsEntryProps) {
  const {entry} = props;
  const {name, size, isFile} = entry;
  const {ref, ext, cmd, opt} = useHfsEntry(props);
  const dir = !isFile;
  return (
    <Touch
      dragRef={ref}
      onPress={cmd.select}
      onDoublePress={dir ? () => cmd.open(true) : undefined}>
      <HfsMenu {...{entry, cmd, on: open => open && cmd.select()}}>
        <ListRow {...{name, size, ext, dir, opt}}/>
      </HfsMenu>
    </Touch>
  );
}
