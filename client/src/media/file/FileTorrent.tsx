import {View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useTorrent} from 'media/hooks/useTorrent';
import {EntryTorrent} from 'media/stacks/EntryTorrent';
import {Page} from 'app/interface/Page';
import {bytesize} from 'app/utils/formatting';

import type {FileProps} from 'media/file';

interface FileTorrent extends FileProps {
  name: string,
  extension: string,
}

export default function FileTorrent(props: FileTorrent) {
  const {styles} = useStyles(stylesheet);
  const torrent = useTorrent(props.path);
  const info = torrent?.info.comment
    ? `${torrent?.info.createdBy} – ${torrent?.info.comment}`
    : torrent?.info.createdBy;
  const msg = `${info} – ${bytesize(torrent?.data?.length ?? 0)}`;

  return (
    <Page title={torrent?.info.name} message={msg} fullWidth>
      <View style={styles.root}>
        {torrent?.data?.files.map(entry => (
          <EntryTorrent key={entry.path} {...{entry}}/>
        ))}
      </View>
    </Page>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    padding: theme.display.space2,
  },
}));
