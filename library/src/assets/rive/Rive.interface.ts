import type {ViewStyle} from 'react-native';
import type {Alignment, Fit, RiveRef} from 'rive-react-native';

export type RiveComponent = (props: RiveProps) => JSX.Element;

export interface RiveProps {
  /** Source of the animation. */
  url: string,
  /** Width of the animation. */
  width?: number,
  /** Height of the animation. */
  height?: number,
  /** Style of the animation. */
  style?: ViewStyle,
  /** Resize mode of the animation. */
  resizeMode?: Fit,
  /** If true, the animation will start playing as soon as it is ready. */
  autoplay?: boolean,
  /** If true, the animation will loop. */
  loop?: boolean,
  /** Alignment of the animation. */
  alignment?: Alignment,
  /** Name of the artboard to play. */
  artboardName?: string | undefined,
  /** Name of the animation to play. */
  animationName?: string | undefined,
  /** Name of the state machine to play. */
  stateMachineName?: string | undefined,
  /** The identifier used for testing */
  testID?: string,
  /** Ref for the web canvas element. */
  refWeb?: React.LegacyRef<HTMLCanvasElement>,
  /** Ref for the native rive view. */
  refNative?: React.LegacyRef<RiveRef>,
}
