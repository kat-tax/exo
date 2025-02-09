import {TouchableOpacity} from 'react-native';
import type {TouchProps} from './touch.types';

export function Touch(props: TouchProps) {
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
