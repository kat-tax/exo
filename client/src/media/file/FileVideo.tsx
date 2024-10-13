import {Video} from 'react-exo/video';

import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';
import type {VideoRef} from 'react-exo/video';

interface FileVideo extends FileProps {
  ref: React.RefObject<VideoRef>,
  name: string,
  extension: string,
}

export type {VideoRef};

export default forwardRef((props: FileVideo, ref: React.Ref<VideoRef>) => {
  const {styles} = useStyles(stylesheet);
  const video = useFileData(props.path, 'dataUrl');

  console.log(props.path, video);

  return (
    <video title={props.name} style={styles.root} src={video} autoPlay muted>
      <track kind="captions" />
    </video>
  );

  // return video ? (
  //   <Video
  //     ref={ref}
  //     title={props.name}
  //     thumbnails={''}
  //     source={{uri: video}}
  //     style={[
  //       styles.root,
  //       props.maximized && styles.maximized,
  //     ]}
  //   />
  // ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
  },
  maximized: {
    margin: theme.display.space3,
  },
}));
