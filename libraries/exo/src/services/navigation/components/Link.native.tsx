import {useCallback} from 'react';
import {useColorScheme, GestureResponderEvent, Pressable, PressableProps} from 'react-native';
import {useLinkPressHandler} from '../hooks/useLinkPressHandler';
import type {To} from 'react-router';

export interface LinkProps extends PressableProps {
  to: To;
  state?: any;
  replace?: boolean;
}

/**
 * A <Pressable> that navigates to a different URL when touched.
 */
export function Link({replace = false, state, to, ...rest}: LinkProps) {
  const scheme = useColorScheme();
  const _handlePress = useLinkPressHandler(to, {replace, state});
  const handlePress = useCallback((event: GestureResponderEvent) => {
    if (!event.defaultPrevented) {
      _handlePress(event);
    }
  }, []);
  return (
    <Pressable
      {...rest}
      onPress={handlePress} 
      android_ripple={{
        borderless: true,
        color: scheme === 'dark'
          ? 'rgba(255, 255, 255, 0.10)'
          : 'rgba(0, 0, 0, 0.10)'
      }}
    />
  );
}
