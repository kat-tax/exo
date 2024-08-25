import {Link} from 'react-exo/navigation';
import {ListRow} from 'media/stacks/ListRow';

import type {HfsDirectoryEntry} from 'react-exo/fs';

export interface EntryHfs {
  entry: HfsDirectoryEntry,
  path?: string,
}

export function EntryHfs(props: EntryHfs) {
  const {entry} = props;
  const link = entry.isFile
    ? `#${encodeURIComponent(entry.name).replace(/%20/g, '+')}`
    : props.path
      ? `${props.path}/${entry.name}`
      : entry.name;

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
