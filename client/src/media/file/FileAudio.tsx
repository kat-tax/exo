import {Video} from 'react-exo/video';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDataUrl} from 'media/hooks/useDataUrl';

import type {FileProps} from 'media/file';
import type {VideoRef} from 'react-exo/video';

interface FileAudio extends FileProps {
  ref: React.RefObject<VideoRef>,
  name: string,
  extension: string,
}

export default forwardRef((props: FileAudio, _ref) => {
  const {styles} = useStyles(stylesheet);
  const audio = useDataUrl(props.path);

  return audio ? (
    <Video
      source={{uri: audio}}
      style={[
        styles.root,
        props.maximized && styles.maximized,
      ]}
    />
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