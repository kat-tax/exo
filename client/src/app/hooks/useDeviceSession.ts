import {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useEvolu, cast} from '@evolu/react-native';
import {useDevice, useDevices} from 'app/data';
import {useGeolocation} from 'app/hooks/useGeolocation';
import {useOnline} from 'app/hooks/useOnline';
import app from 'app/store/app';

import type {DB} from 'app/data';

let _registered = false;

export function useDeviceSession(): Partial<ReturnType<typeof useDevice>> {
  const uuid = useSelector(app.selectors.getDevice);
  const evolu = useEvolu<DB>();
  const device = useDevice(uuid);
  const devices = useDevices();
  const geoloc = useGeolocation();
  const online = cast(useOnline());
  const coords = geoloc ?? device?.coords;
  const id = device?.id;

  useEffect(() => {
    if (!_registered && !id && !devices.find(d => d.uuid === uuid)) {
      evolu.create('device', {uuid, online, coords});
      _registered = true;
    } else if (id) {
      evolu.update('device', {id, uuid, online, coords});
    }
  }, [id, uuid, devices, online, coords, evolu]);

  return useMemo(
    () => ({id, uuid, coords, online}),
    [id, uuid, coords, online],
  );
}
