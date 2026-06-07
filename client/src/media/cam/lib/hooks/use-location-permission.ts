import {useCallback, useEffect, useMemo, useState} from 'react';
import type {useLocationPermission as _} from 'react-native-vision-camera';

export const useLocationPermission: typeof _ = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({name: 'geolocation' as PermissionName});
        return result.state === 'granted';
      }
      // Fallback: check if geolocation is available
      return 'geolocation' in navigator;
    } catch {
      return false;
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        () => {
          setHasPermission(true);
          resolve(true);
        },
        () => {
          setHasPermission(false);
          resolve(false);
        },
        {timeout: 1000},
      );
    });
  }, []);

  useEffect(() => {
    checkPermission().then(setHasPermission);
  }, [checkPermission]);

  return useMemo(
    () => ({
      hasPermission,
      requestPermission,
    }),
    [hasPermission, requestPermission],
  );
}
