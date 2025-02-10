import Geolocation from '@react-native-community/geolocation';
import {isOnline, suscribeOnline} from 'react-exo/device';
import {useEvolu, cast} from '@evolu/react-native';
import {useSelector} from 'react-redux';
import {useLingui} from '@lingui/react/macro';
import {useEffect, useMemo, useState} from 'react';
import {useDevices, useDevice as useDeviceData} from 'app/data';
import {toast} from 'react-exo/toast';
import app from 'app/store';

import type {DB} from 'app/data';

let _registered = false;

export function useDevice(): Partial<ReturnType<typeof useDeviceData>> {
  const {t} = useLingui();
  const [online, setOnline] = useState(cast(false));
  const [geoloc, setGeoloc] = useState<[number, number]>();

  const uuid = useSelector(app.selectors.getDevice);
  const evolu = useEvolu<DB>();
  const device = useDeviceData(uuid);
  const devices = useDevices();
  const coords = geoloc ?? device?.coords;
  const id = device?.id;

  // Synchronization
  useEffect(() => {
    if (!_registered && !id && !devices.find(d => d.uuid === uuid)) {
      evolu.create('device', {uuid, online, coords});
      _registered = true;
    } else if (id) {
      evolu.update('device', {id, uuid, online, coords});
    }
  }, [id, uuid, devices, online, coords, evolu]);

  // Connection
  useEffect(() => {
    const update = (online: boolean, init?: boolean) => {
      if (online && !init) {
        toast({title: t`You are online`, preset: 'done'});
      } else if (!online) {
        toast({title: t`You are offline`, preset: 'error'});
      }
      setOnline(cast(online));
    };
    isOnline().then(online => update(online, true));
    return suscribeOnline(update);
  }, [t]);

  // Position
  useEffect(() => {
    const id = Geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => setGeoloc([latitude, longitude]),
      ({message}) => toast({title: t`Geolocation Error`, preset: 'error', message}),
    );
    return () => Geolocation.clearWatch(id);
  }, [t]);

  return useMemo(
    () => ({id, uuid, coords, online}),
    [id, uuid, coords, online],
  );
}
