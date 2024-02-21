import type {ViewStyle} from 'react-native';
import type {Alignment, Fit} from 'rive-react-native';

export interface RiveProps {
  url: string,
  ref: any,
  fit: Fit,
  alignment: Alignment,
  style?: ViewStyle,
  autoplay?: boolean,
  artboardName?: string | undefined,
  animationName?: string | undefined,
  stateMachineName?: string | undefined,
  resourceName?: string | undefined,
  isUserHandlingErrors?: boolean,
  testID?: string,
}
