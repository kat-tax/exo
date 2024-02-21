import VideoBase from 'react-native-video';
import type {VideoProps} from './Video.interface';

export function Video(props: VideoProps) {
  return (
    <VideoBase {...props}/>
  );
}
