import {Pressable} from 'react-native';
import {useCallback} from 'react';
import {useLinkPressHandler} from '../hooks/useLinkPressHandler';

import type {LinkNative} from './Link.interface';
import type {GestureResponderEvent} from 'react-native';

export function Link({replace = false, state, to, ...rest}: LinkNative): React.ReactNode {
  const press = useLinkPressHandler(to, {replace, state});
  const handler = useCallback((e: GestureResponderEvent) => {
    if (!e.defaultPrevented)
      press(e);
  }, [press]);

  return (
    <Pressable
      {...rest}
      onPress={handler}
    />
  );
}

if (__DEV__) {
  Link.displayName = 'Link';
}
