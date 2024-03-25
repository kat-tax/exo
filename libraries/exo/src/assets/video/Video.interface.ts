import type {VideoProperties as VideoProps} from 'react-native-video';

export type VideoComponent = (props: VideoProps) => JSX.Element;

export {VideoProps};
