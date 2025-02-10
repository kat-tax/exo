import {useSelector} from 'react-redux';
import {useEvolu, cast} from '@evolu/react-native';
import {useEffect, useMemo} from 'react';
import {useDevice, useDevices} from 'app/data';
import {useGeolocation} from 'app/hooks/use-geolocation';
import {useNetwork} from 'app/hooks/use-network';
import app from 'app/store';

import type {DB} from 'app/data';

let _registered = false;

export function useSession(): Partial<ReturnType<typeof useDevice>> {
  const uuid = useSelector(app.selectors.getDevice);
  const evolu = useEvolu<DB>();
  const geoloc = useGeolocation();
  const network = useNetwork();
  const devices = useDevices();
  const device = useDevice(uuid);
  const online = cast(network);
  const coords = geoloc.coords ?? device?.coords;
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
