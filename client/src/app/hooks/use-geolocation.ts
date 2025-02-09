import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {useLingui} from '@lingui/react/macro';
import {toast} from 'react-exo/toast';

export function useGeolocation() {
  const {t} = useLingui();
  const [coords, setCoords] = useState<[number, number]>();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const id = Geolocation.watchPosition(
      ({coords}) => setCoords([
        coords.latitude,
        coords.longitude,
      ]),
      ({message}) => toast({
        title: t`Geolocation Error`,
        preset: 'error',
        message,
      }),
      {
        distanceFilter: 2,
        enableHighAccuracy: true,
        fastestInterval: 5000,
        interval: 10000,
      },
    );
    return () => Geolocation.clearWatch(id);
  }, [t, enabled]);

  return {
    coords,
    enabled,
    start: () => setEnabled(true),
    stop: () => setEnabled(false),
  };
}
