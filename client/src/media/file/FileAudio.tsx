import {Video} from 'react-exo/video';

import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';
import type {VideoRef} from 'react-exo/video';

export interface FileAudio extends FileProps {
  ref: React.RefObject<VideoRef>,
  name: string,
  extension: string,
}

export default forwardRef((props: FileAudio, _ref) => {
  const {styles} = useStyles(stylesheet);
  const video = useFileData(props.path, 'dataUrl');
  const vstyles = {
    root: [
      styles.root,
      props.maximized && styles.maximized,
    ],
  };

  return video ? (
    <View style={vstyles.root}>
      <Video source={{uri: video}}/>
    </View>
  ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
  },
  maximized: {
    margin: theme.display.space3,
  },
}));
