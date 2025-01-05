import {Pressable} from 'react-native';
import {useMemo} from 'react';
import {useLocation, useNavigate} from 'react-exo/navigation';
import {useDirHfsEntry} from 'media/hooks/useDirHfsEntry';
import {filesToHash, hashToFiles} from 'app/utils/formatting';
import {ListRow} from 'media/stacks/ListRow';

import type {HfsDirectoryEntry} from 'react-exo/fs';

export interface EntryHfs {
  entry: HfsDirectoryEntry,
  index: number,
  path?: string,
  flags?: {
    multiSelect?: boolean,
  },
}

export function EntryHfs(props: EntryHfs) {
  const {entry, flags, path} = props;
  const {hash} = useLocation();
  const file = useDirHfsEntry(entry);
  const nav = useNavigate();

  // Update selection when hash changes
  const selection = useMemo(() => hashToFiles(hash), [hash]);

  // Update link when selection changes
  const link = useMemo(() => {
    // Files are stored in the hash
    if (entry.isFile) {
      return filesToHash(flags?.multiSelect
        ? selection.includes(entry.name)
          ? selection.filter(e => e !== entry.name)
          : [...selection, entry.name]
        : [entry.name]);
    }
    // Otherwise, we use the path (if not root)
    if (path) {
      return `${path}/${entry.name}`;
    }
    // Otherwise, we use the entry name
    return entry.name;
  }, [entry, path, flags, selection]);

  // Handlers for menu events
  const events = useMemo(() => ({
    menu: () => {},
    view: () => nav(link),
    share: () => {},
    copy: () => {},
    move: () => {},
    rename: () => {},
    delete: file.del,
  }), [link, file.del, nav]);

  return (
    <Pressable onPress={events.view}>
      <ListRow
        path={link}
        name={entry.name}
        index={props.index}
        events={events}
        isFile={entry.isFile}
        isFocused={false}
        isSelected={selection.includes(entry.name)}
      />
    </Pressable>
  );
}
