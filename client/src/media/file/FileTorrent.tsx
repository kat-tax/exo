import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileTorrent} from 'media/hooks/useFileTorrent';
import {DirTorrent} from 'media/dir/DirTorrent';
import {Page} from 'app/interface/Page';

import type {FileProps} from 'media/file';

export interface FileTorrent extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileTorrent, _ref) => {
  const {torrent, download} = useFileTorrent(props.path);
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Page
        title={torrent?.name}
        message={torrent?.desc}
        margin="small"
        noBackground
        noFrame
        fullWidth>
        <View style={styles.inner}>
          {torrent && (
            <DirTorrent
              torrent={torrent}
              download={download}
            />
          )}
        </View>
      </Page>
    </View>
  )
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
    marginHorizontal: theme.display.space2,
  },
  inner: {
    paddingBottom: theme.display.space5,
  },
}));
