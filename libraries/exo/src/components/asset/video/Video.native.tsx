import VideoBase from 'react-native-video';
import type {VideoProps} from './Video.props';

export function Video(props: VideoProps) {
  return (
    <VideoBase {...props}/>
  );
}
