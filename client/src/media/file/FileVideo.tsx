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
}

export default forwardRef((props: Omit<FileVideo, 'ref'>, ref: React.Ref<VideoRef>) => {
  const source = useFileData(props.path, 'dataUrl');
  const {styles} = useStyles(stylesheet);
  const {actions} = props;

  const update = useCallback(async () => {
    // @ts-ignore
    const current = await ref?.current?.getCurrentTime();
    // @ts-ignore
    const duration = await ref?.current?.getDuration();
    actions.setInfo(toTimeRange(current, duration));
    actions.setCurrent(current);
    actions.setDuration(duration);
  }, [ref, actions]);

  // Update file player bar info when source changes
  useEffect(() => {
    if (!source) {
      actions.setInfo('00:00:00 / 00:00:00');
      actions.setCurrent(0);
      actions.setDuration(0);
      return;
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [source, actions, update]);

  return source ? (
    <View style={styles.root}>
      <Video ref={ref} source={{uri: source}}/>
    </View>
  ) : null;
});

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
  },
}));
