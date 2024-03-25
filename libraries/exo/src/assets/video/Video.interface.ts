import type {ReactVideoProps} from 'react-native-video';

export type VideoComponent = (props: ReactVideoProps) => JSX.Element;

export {ReactVideoProps as VideoProps};
