import {t} from '@lingui/macro';
import {toast} from 'react-exo/toast';
import {useLingui} from '@lingui/react';
import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

export function useGeolocation() {
  const {i18n} = useLingui();
  const [coords, setCoords] = useState<[number, number]>();

  useEffect(() => {
    const id = Geolocation.watchPosition(
      ({coords}) => setCoords([
        coords.latitude,
        coords.longitude,
      ]),
      ({message}) => toast({
        title: t(i18n)`Geolocation Error`,
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
  }, [i18n]);

  return coords;
}
