import {Video} from 'react-exo/video';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDataUrl} from 'media/hooks/useDataUrl';

import type {FileProps} from 'media/file';
import type {VideoRef} from 'react-exo/video';

interface FileVideo extends FileProps {
  ref: React.RefObject<VideoRef>,
  name: string,
  extension: string,
}

export type {VideoRef};

export default forwardRef((props: FileVideo) => {
  const {styles} = useStyles(stylesheet);
  const video = useDataUrl(props.path);

  return video ? (
    <Video
      source={{uri: video}}
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
