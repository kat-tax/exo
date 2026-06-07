import {useComposedRefs} from 'app/lib/components';
import {useTheme} from 'settings/hooks/use-theme';

import type {GestureResponderEvent} from 'react-native';
import type {TouchProps} from './touch.types';

export function Touch(props: TouchProps) {
  const [theme] = useTheme();
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: events handled by focusable
    <div
      ref={useComposedRefs(...props.refs)}
      onClick={(e) => {
        if (e.detail === 2) {
          props.onDoublePress?.(e as unknown as GestureResponderEvent);
        } else {
          props.onPress?.(e as unknown as GestureResponderEvent);
        }
      }}
      className={`_p ${theme}`}
      // biome-ignore lint/a11y/useSemanticElements: needs to be div
      role="button"
      tabIndex={0}>
      {props.children}
    </div>
  );
}
