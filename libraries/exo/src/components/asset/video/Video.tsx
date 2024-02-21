import {View} from 'react-native';
import {MediaPlayer, MediaProvider} from '@vidstack/react';
import {defaultLayoutIcons, DefaultVideoLayout} from '@vidstack/react/player/layouts/default';

import type {VideoProps} from './Video.interface';
import './Video.module.css';

export function Video(props: VideoProps) {
  return (
    <View style={props.style}>
      <MediaPlayer src={props.source?.toString()}>
        <MediaProvider/>
        <DefaultVideoLayout
          thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
          icons={defaultLayoutIcons}
          noScrubGesture={false}
        />
      </MediaPlayer>
    </View>
  );
}
