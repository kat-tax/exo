import type {GestureResponderEvent} from 'react-native';

export interface TouchProps extends React.PropsWithChildren {
  // biome-ignore lint/suspicious/noExplicitAny: multiple ref types
  refs?: any;
  onPress?: (e: GestureResponderEvent) => void;
  onDoublePress?: (e: GestureResponderEvent) => void;
}
