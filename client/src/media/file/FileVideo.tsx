import {Video} from 'react-exo/video';

import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';
import type {VideoRef} from 'react-exo/video';

export interface FileVideo extends FileProps {
  ref: React.RefObject<VideoRef>,
  name: string,
  extension: string,
}

export default forwardRef((props: FileVideo, _ref) => {
  const {styles} = useStyles(stylesheet);
  const video = useFileData(props.path, 'dataUrl');

  return video ? (
    <View style={styles.root}>
      <Video source={{uri: video}}/>
    </View>
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
