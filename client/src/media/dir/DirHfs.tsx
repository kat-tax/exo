import {EntryHfs} from 'media/dir/EntryHfs';

import type {DirBaseProps} from 'media/dir';
import type {HfsDirectoryEntry} from 'react-exo/fs';

export interface DirHfsProps extends DirBaseProps {
  entries: HfsDirectoryEntry[],
}

export function DirHfs({path, entries}: DirHfsProps) {
  return entries.map(entry =>
    <EntryHfs key={entry.name} {...{entry, path}}/>
  )
}
