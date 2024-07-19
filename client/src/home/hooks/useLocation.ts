import {t} from '@lingui/macro';
import {toast} from 'react-exo/toast';
import {useLingui} from '@lingui/react';
import {useEffect, useState, useMemo, useCallback} from 'react';
import {isNative} from 'app/utils/platform';
import GPS from '@react-native-community/geolocation';

import type {Location} from 'app/data/schema';

export function useLocation(loc?: Location | null) {
  const {i18n} = useLingui();
  const [position, setPosition] = useState<[number, number]>();
  const [authorized, setAuthorized] = useState<boolean>(!!loc);

  // Request location permission
  const request = useCallback(() => new Promise<void>((res, rej) => {
    isNative() && GPS.requestAuthorization(() => res(), e => rej(e));
    setAuthorized(true);
    res();
  }), []);

  // Watch for location updates
  useEffect(() => {
    if (!authorized) return;
    const watchId = GPS.watchPosition(
      ({coords}) => {
        setAuthorized(true);
        setPosition([coords.latitude, coords.longitude]);
      },
      ({message}) => {
        setAuthorized(false);
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
  }, [i18n, authorized]);

  // Return memoized values
  return useMemo(
    () => ({request, position, authorized}),
    [request, position, authorized],
  );
}
