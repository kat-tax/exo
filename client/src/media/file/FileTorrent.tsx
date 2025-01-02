import {View} from 'react-native';
import {useEffect, forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileTorrent} from 'media/hooks/useFileTorrent';
import {DirTorrent} from 'media/dir/DirTorrent';
import {bytesize} from 'app/utils/formatting';
import {Page} from 'app/interface/Page';

import type {FileProps} from 'media/file';

export interface FileTorrent extends FileProps {}

export default forwardRef((props: FileTorrent, _ref) => {
  const {torrent, download} = useFileTorrent(props.path);
  const {styles} = useStyles(stylesheet);

  // Update file player bar info
  useEffect(() => {
    if (!torrent) return;
    const size = bytesize(torrent.list.reduce((acc, file) => acc + file.length, 0));
    props.actions.setInfo(`${torrent.list.length} files, ${size}`);
  }, [torrent, props.actions]);

  return (
    <View style={styles.root}>
      <Page
        title={torrent?.info.name}
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
