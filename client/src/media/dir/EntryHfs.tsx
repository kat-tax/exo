import {useMemo} from 'react';
import {useLocation, Link} from 'react-exo/navigation';
import {filesToHash, hashToFiles} from 'app/utils/formatting';
import {ListRow} from 'media/stacks/ListRow';

import type {HfsDirectoryEntry} from 'react-exo/fs';

export interface EntryHfs {
  entry: HfsDirectoryEntry,
  path?: string,
}

export function EntryHfs(props: EntryHfs) {
  const {entry} = props;
  const {hash} = useLocation();

  const link = useMemo(() => {
    // Files are stored in the hash
    if (entry.isFile) {
      // Add the entry to the end of the hash
      return filesToHash(hashToFiles(hash)
        .filter(e => e !== entry.name)
        .concat(entry.name));
    }
    // Otherwise, we use the path (if not root)
    if (props.path) {
      return `${props.path}/${entry.name}`;
    }
    // Otherwise, we use the entry name
    return entry.name;
  }, [entry, hash, props.path]);

  return (
    <Link to={link}>
      <ListRow
        path={link}
        name={entry.name}
        isFile={entry.isFile}
      />
    </Link>
  );
}
