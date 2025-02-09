import {View} from 'react-native';
import {useEffect, forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDirTorrent} from 'media/dir/hooks/use-dir-torrent';
import {DirTorrent} from 'media/dir/stacks/dir-torrent';
import {bytesize} from 'app/utils/formatting';
import {Panel} from 'app/stacks/panel';

import type {FileProps} from 'media/file';

export interface FileTorrent extends FileProps {}

export default forwardRef((props: FileTorrent, _ref) => {
  const {torrent, cmd} = useDirTorrent(props.path);
  const {styles} = useStyles(stylesheet);

  // Update file player bar info
  useEffect(() => {
    if (!torrent) return;
    const size = bytesize(torrent.list.reduce((acc, file) => acc + file.length, 0));
    props.actions.setInfo(`${torrent.list.length} files, ${size}`);
    props.actions.setTitle(torrent.info.name);
  }, [torrent, props.actions]);

  return (
    <View style={styles.root}>
      <Panel
        title={props.embedded ? props.name : undefined}
        message={props.embedded ? `${torrent?.info.name}` : undefined}
        margin="small"
        noBackground
        noFrame
        fullWidth>
        <View style={styles.inner}>
          {torrent && <DirTorrent {...{torrent, cmd}}/>}
        </View>
      </Panel>
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
