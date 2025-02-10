import {Video} from 'react-exo/video';
import {View} from 'react-native';
import {forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFile} from 'media/file/hooks/use-file';
import {toTimeRange} from 'app/utils/formatting';

import type {FileProps} from 'media/file';
import type {VideoRef} from 'react-exo/video';

export type {VideoRef};

export interface FileVideo extends FileProps {
  ref: React.RefObject<VideoRef>,
}

export default forwardRef((props: Omit<FileVideo, 'ref'>, ref: React.Ref<VideoRef>) => {
  const source = useFile(props.path, 'dataUrl');
  const {styles} = useStyles(stylesheet);
  const {actions} = props;

  return source ? (
    <View style={styles.root}>
      <Video
        ref={ref}
        source={{uri: source}}
        paused={props.embedded}
        controls={props.embedded}
        resizeMode="contain"
        onProgress={e => {
          actions.setCurrent(e.currentTime);
          actions.setDuration(e.playableDuration);
          actions.setInfo(toTimeRange(e.currentTime, e.playableDuration));
        }}
        onVolumeChange={e => {
          actions.setVolume(e.volume);
        }}
        onPlaybackStateChanged={(e) => {
          actions.setPlaying(e.isPlaying);
        }}
      />
    </View>
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
