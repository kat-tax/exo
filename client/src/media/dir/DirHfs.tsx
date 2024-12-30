import {useState, useEffect} from 'react';
import {EntryHfs} from 'media/dir/EntryHfs';

import type {DirBaseProps} from 'media/dir';
import type {HfsDirectoryEntry} from 'react-exo/fs';

export interface DirHfsProps extends DirBaseProps {
  entries: HfsDirectoryEntry[],
}

export function DirHfs({path, entries}: DirHfsProps) {
  const [multiSelect, setMultiSelect] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Command' || e.key === 'Meta') {
        setMultiSelect(true);
        console.log('down', e.key);
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'Command' || e.key === 'Meta') {
        setMultiSelect(false);
        console.log('up', e.key);
      }
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return entries.map(entry =>
    <EntryHfs
      key={entry.name}
      {...{entry, path}}
      flags={{
        multiSelect,
      }}
    />
  );
}
