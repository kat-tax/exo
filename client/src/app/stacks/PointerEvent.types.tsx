import type {View} from 'react-native';

export interface PointerEventProps extends React.PropsWithChildren {
  dragRef?: React.RefObject<View>;
  onPress?: () => void;
  onDoublePress?: () => void;
}

