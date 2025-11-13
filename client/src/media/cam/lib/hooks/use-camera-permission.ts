import {useCallback, useEffect, useMemo, useState} from 'react';
import type {useCameraPermission as _} from 'react-native-vision-camera';

export const useCameraPermission: typeof _ = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({name: 'camera' as PermissionName});
        return result.state === 'granted';
      }
      // Fallback: try to get user media to check permission
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        stream.getTracks().forEach((track) => track.stop());
        return true;
      } catch {
        return false;
      }
    } catch {
      return false;
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      stream.getTracks().forEach((track) => track.stop());
      const granted = true;
      setHasPermission(granted);
      return granted;
    } catch (error) {
      const granted = false;
      setHasPermission(granted);
      return granted;
    }
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
