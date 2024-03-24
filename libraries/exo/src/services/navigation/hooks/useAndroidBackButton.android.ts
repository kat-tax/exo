import {useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';

const BackPressEvent = 'hardwareBackPress';

/**
 * Enables support for the hardware back button on Android.
 */
export function useAndroidBackButton(callback: () => boolean) {
  const handler = useCallback(() => {
    return callback();
  }, [callback]);

  useEffect(() => {
    BackHandler.addEventListener(BackPressEvent, handler);
    return () => {
      BackHandler.removeEventListener(BackPressEvent, handler);
    };
  }, [handler]);
}
