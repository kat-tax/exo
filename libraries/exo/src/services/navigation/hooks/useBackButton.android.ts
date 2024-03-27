import {useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';

export function useBackButton(callback: () => boolean) {
  const handler = useCallback(() => (callback()), [callback]);

  useEffect(() => {
    const key = 'hardwareBackPress';
    BackHandler.addEventListener(key, handler);
    return () => BackHandler.removeEventListener(key, handler);
  }, [handler]);
}
