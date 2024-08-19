import {View} from 'react-native';
import {Link} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {ListRow} from './ListRow';

import type {TorrentFileData} from 'media/utils/torrent';

interface EntryTorrent {
  entry: TorrentFileData['files'][number],
}

export function EntryTorrent(props: EntryTorrent) {
  const {styles} = useStyles(stylesheet);
  const {entry} = props;

  return (
    <View style={styles.root}>
      <Link to={entry.path}>
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
