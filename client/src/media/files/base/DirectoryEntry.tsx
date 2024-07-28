import {View} from 'react-native';
import {Link} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {DirectoryEntryRow} from 'media/files/base/DirectoryEntryRow';

import type {HfsDirectoryEntry} from 'react-exo/fs';

interface DirectoryEntry {
  entry: HfsDirectoryEntry,
  path?: string,
}

export function DirectoryEntry(props: DirectoryEntry) {
  const {styles} = useStyles(stylesheet);
  const {entry} = props;
  const base = `/${entry.isDirectory ? 'browse' : 'file'}`;
  const path = props.path ? `${base}/${props.path}` : base;
  return (
    <View style={styles.root}>
      <Link to={`${path}/${entry.name}`}>
        <DirectoryEntryRow name={entry.name}/>
      </Link>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    padding: theme.display.space2,
  },
}));
