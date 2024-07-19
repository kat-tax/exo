import {t} from '@lingui/macro';
import {toast} from 'react-exo/toast';
import {useLingui} from '@lingui/react';
import {useEffect, useState, useMemo, useCallback} from 'react';
import {isNative} from 'app/utils/platform';
import GPS from '@react-native-community/geolocation';

export function useCoords() {
  const {i18n} = useLingui();
  const [coords, setCoords] = useState<[number, number]>();

  // Request location permission
  const request = useCallback(() => new Promise<void>((res, rej) => {
    isNative() && GPS.requestAuthorization(() => res(), e => rej(e));
    res();
  }), []);

  // Watch for location updates
  useEffect(() => {
    const watchId = GPS.watchPosition(
      ({coords}) => {
        setCoords([coords.latitude, coords.longitude]);
      },
      ({message}) => {
        toast({
          message,
          preset: 'error',
          title: t(i18n)`Geo Location Failure`,
        });
      },
      {
        distanceFilter: 2,
        enableHighAccuracy: true,
        fastestInterval: 5000,
        interval: 10000,
      },
    );
    return () => GPS.clearWatch(watchId);
  }, [i18n]);

  // Return memoized values
  return useMemo(
    () => ({request, coords}),
    [request, coords],
  );
}
