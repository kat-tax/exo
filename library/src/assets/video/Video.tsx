import {View} from 'react-native';
import {MediaPlayer} from '@vidstack/react';
import type {VideoComponent, VideoProps} from './Video.interface';

/** A component that enables video playblack */
export const Video: VideoComponent = (props: VideoProps) => {
  return (
    <View style={props.style}>
      <MediaPlayer
        style={{flex: 1}}
        src={typeof props?.source === 'number'
          ? undefined
          : props?.source?.uri
        }
      />
    </View>
  );
}
