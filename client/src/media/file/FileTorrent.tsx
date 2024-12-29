import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileTorrent} from 'media/hooks/useFileTorrent';
import {Page} from 'app/interface/Page';
import Directory from 'media/dir';

import type {FileProps} from 'media/file';

export interface FileTorrent extends FileProps {
  name: string,
  extension: string,
}

export default forwardRef((props: FileTorrent, _ref) => {
  const {torrent, download} = useFileTorrent(props.path);
  const {styles} = useStyles(stylesheet);

  return (
    <Page
      title={torrent?.name}
      message={torrent?.desc}
      noFrame={!props.maximized}
      fullWidth>
      <View style={styles.root}>
        <Directory
          path={props.path}
          {...{torrent, download}}
        />
      </View>
    </Page>
  )
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    paddingBottom: theme.display.space5,
  },
}));
