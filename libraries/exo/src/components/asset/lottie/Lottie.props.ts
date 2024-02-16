import type {ViewStyle} from 'react-native';

export interface LottieProps {
  /** The source of the animation, it can be a JSON file or a DotLottie file. */
  source: string,
  /** The style of the animation. */
  style?: ViewStyle,
  /** The resize mode of the animation. */
  resizeMode?: 'cover' | 'contain' | 'stretch',
  /** A value that controls the speed of the animation. */
  speed?: number,
  /** If true, the animation will loop. */
  loop?: boolean,
  /** If true, the animation will start playing as soon as it is ready. */
  autoPlay?: boolean,
}
