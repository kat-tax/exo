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
  const link = useMemo(() => {
    // Files are stored in the hash
    if (entry.isFile) {
      const current = hashToFiles(hash);
      return filesToHash(flags?.multiSelect
        ? current.includes(entry.name)
          ? current.filter(e => e !== entry.name)
          : [...current, entry.name]
        : [entry.name]);
    }
    // Otherwise, we use the path (if not root)
    if (path) {
      return `${path}/${entry.name}`;
    }
    // Otherwise, we use the entry name
    return entry.name;
  }, [entry, hash, path, flags]);

  const navigate = useNavigate();

  return (
    <Pressable onPress={() => navigate(link)}>
      <ListRow
        path={link}
        name={entry.name}
        isFile={entry.isFile}
      />
    </Pressable>
  );
}
