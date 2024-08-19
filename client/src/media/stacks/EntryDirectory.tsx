import {View} from 'react-native';
import {Link} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {ListRow} from './ListRow';

import type {HfsDirectoryEntry} from 'react-exo/fs';

interface EntryDirectory {
  entry: HfsDirectoryEntry,
  path?: string,
}

export function EntryDirectory(props: EntryDirectory) {
  const {styles} = useStyles(stylesheet);
  const {entry} = props;
  const link = entry.isFile
    ? `#${entry.name}`
    : props.path
      ? `${props.path}/${entry.name}`
      : entry.name;

  return (
    <View style={styles.root}>
      <Link to={link}>
        <ListRow name={entry.name}/>
      </Link>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    padding: theme.display.space2,
  },
}));
