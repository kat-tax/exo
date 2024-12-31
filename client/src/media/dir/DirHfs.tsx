import {useState, useEffect} from 'react';
import {useDirHfs} from 'media/hooks/useDirHfs';
import {EntryHfs} from 'media/dir/EntryHfs';

export interface DirHfsProps {
  path: string,
}

export function DirHfs(props: DirHfsProps) {
  const [multiSelect, setMultiSelect] = useState(false);
  const {path, entries} = useDirHfs(props.path, {showHidden: true});

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Command' || e.key === 'Meta') {
        setMultiSelect(true);
      }
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'Command' || e.key === 'Meta') {
        setMultiSelect(false);
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
      key={entry.isDirectory ? `.${entry.name}` : entry.name}
      flags={{multiSelect}}
      {...{entry, path}}
    />
  );
}
