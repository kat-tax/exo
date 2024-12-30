import {useMemo} from 'react';
import {Pressable} from 'react-native';
import {useLocation, useNavigate} from 'react-exo/navigation';
import {filesToHash, hashToFiles} from 'app/utils/formatting';
import {ListRow} from 'media/stacks/ListRow';

import type {HfsDirectoryEntry} from 'react-exo/fs';

export interface EntryHfs {
  entry: HfsDirectoryEntry,
  path?: string,
  flags?: {
    multiSelect?: boolean,
  },
}

export function EntryHfs(props: EntryHfs) {
  const {entry, path, flags} = props;
  const {hash} = useLocation();

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

  const navigate = useNavigate();

  return (
    <Pressable onPress={() => navigate(link)}>
      <ListRow
        path={link}
        name={entry.name}
        isFile={entry.isFile}
        isFocused={false}
        isSelected={selection.includes(entry.name)}
      />
    </Pressable>
  );
}
