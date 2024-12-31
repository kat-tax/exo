import {Video} from 'react-exo/video';

import {View} from 'react-native';
import {useEffect, useCallback, forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileData} from 'media/hooks/useFileData';
import {toTimeRange} from 'app/utils/formatting';

import type {FileProps} from 'media/file';
import type {VideoRef} from 'react-exo/video';

export type {VideoRef};

export interface FileVideo extends FileProps {
  ref: React.RefObject<VideoRef>,
  name: string,
  extension: string,
}

export default forwardRef((props: FileVideo, ref: React.Ref<VideoRef>) => {
  const {styles} = useStyles(stylesheet);
  const video = useFileData(props.path, 'dataUrl');

  const update = useCallback(async () => {
    // @ts-ignore
    const current = await ref?.current?.getCurrentTime();
    // @ts-ignore
    const duration = await ref?.current?.getDuration();
    props.setBarInfo(toTimeRange(current, duration));
  }, [ref, props.setBarInfo]);

  // Update file player bar info
  useEffect(() => {
    if (!video) {
      props.setBarInfo('00:00:00 / 00:00:00');
      return;
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [video, update, props.setBarInfo]);

  return video ? (
    <View style={styles.root}>
      <Video ref={ref} source={{uri: video}}/>
    </View>
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
