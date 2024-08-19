import {View, Pressable} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {ListRow} from './ListRow';

import type {TorrentFileData} from 'media/utils/torrent';

interface EntryTorrent {
  entry: TorrentFileData['files'][number],
  download: (path: string, offset: number, length: number) => void,
}

export function EntryTorrent(props: EntryTorrent) {
  const {styles} = useStyles(stylesheet);
  const {entry} = props;

  return (
    <View style={styles.root}>
      <Pressable onPress={() => props.download(entry.path, entry.offset, entry.length)}>
        <ListRow name={entry.name} size={entry.length}/>
      </Pressable>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    padding: theme.display.space2,
  },
}));
