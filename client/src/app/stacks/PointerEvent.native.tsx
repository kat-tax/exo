import {TouchableOpacity} from 'react-native';
import type {PointerEventProps} from './PointerEvent.types';

export function PointerEvent(props: PointerEventProps) {
  return (
    <TouchableOpacity
      ref={props.dragRef}
      onPress={props.onPress}
      onLongPress={props.onDoublePress}
      activeOpacity={0.6}>
      {props.children}
    </TouchableOpacity>
  );
}
