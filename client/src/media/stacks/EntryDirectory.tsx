import {Link} from 'react-exo/navigation';
import {ListRow} from './ListRow';

import type {HfsDirectoryEntry} from 'react-exo/fs';

interface EntryDirectory {
  entry: HfsDirectoryEntry,
  path?: string,
}

export function EntryDirectory(props: EntryDirectory) {
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
