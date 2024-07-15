import {t} from '@lingui/macro';
import {toast} from 'react-exo/toast';
import {useLingui} from '@lingui/react';
import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

export type Location = [number, number];

export function useLocation() {
  const [location, setLocation] = useState<Location>([0,0]);
  const {i18n} = useLingui();

  // Watch for location updates
  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setLocation([latitude, longitude]);
      },
      (error) => {
        toast({
          preset: 'error',
          title: t(i18n)`Geo Location Failure`,
          message: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        fastestInterval: 5000,
        interval: 10000,
        distanceFilter: 2,
      },
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  return location;
}
