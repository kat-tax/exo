import VideoBase from 'react-native-video';
import type {VideoComponent, VideoProps} from './Video.interface';

export const Video: VideoComponent = (props: VideoProps) => {
  return (
    <VideoBase {...props}/>
  );
}
