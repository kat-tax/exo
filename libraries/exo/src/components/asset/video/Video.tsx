import {View} from 'react-native';
import {MediaPlayer, MediaProvider} from '@vidstack/react';
import {defaultLayoutIcons, DefaultVideoLayout} from '@vidstack/react/player/layouts/default';

import type {VideoComponent, VideoProps} from './Video.interface';
import './Video.css';

/** A component that enables video playblack */
export const Video: VideoComponent = (props: VideoProps) => {
  return (
    <View style={props.style}>
      <MediaPlayer style={{flex: 1}} src={props?.source?.uri}>
        <MediaProvider/>
        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          noScrubGesture={false}
        />
      </MediaPlayer>
    </View>
  );
}
