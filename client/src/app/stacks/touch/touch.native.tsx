import {useComposedRefs} from 'app/utils/components';
import {TouchableOpacity} from 'react-native';
import type {TouchProps} from './touch.types';

export function Touch({refs, ...props}: TouchProps) {
  return (
    <TouchableOpacity
      ref={useComposedRefs(refs)}
      // onFocus={e => foc?.focusSelf(e.nativeEvent)}
      onPress={props.onPress}
      onLongPress={props.onDoublePress}
      activeOpacity={0.6}>
      {props.children}
    </TouchableOpacity>
  );
}
