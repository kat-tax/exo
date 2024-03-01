import type {ViewStyle} from 'react-native';
import type {Alignment, Fit} from 'rive-react-native';

export type RiveComponent = (props: RiveProps) => JSX.Element;

export interface RiveProps {
  url: string,
  ref: any,
  fit: Fit,
  alignment: Alignment,
  style?: ViewStyle,
  loop?: boolean,
  autoplay?: boolean,
  artboardName?: string | undefined,
  animationName?: string | undefined,
  stateMachineName?: string | undefined,
  testID?: string,
}
