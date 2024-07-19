import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useEvolu, useQuery} from '@evolu/react-native';
import {useLocation} from 'home/hooks/useLocation';
import {device} from 'app/data';
import app from 'app/store/app';

import type {Database} from 'app/data/schema';

export function useDevice() {
  const uuid = useSelector(app.selectors.getDevice);
  const evolu = useEvolu<Database>();
  const {row} = useQuery(device(uuid));
  const {position, authorized} = useLocation(row?.location);
  console.log(uuid, row, position, authorized);
  
  useEffect(() => {
    const location = authorized &&position ? {
      latitude: position[0],
      longitude: position[1],
    } : undefined;
    if (!row) {
      evolu.create('device', {
        location,
        uuid,
      });
    } else {
      evolu.createOrUpdate('device', {
        id: row?.id,
        location,
        uuid,
      });
    }
  }, [uuid, position, evolu, row, authorized]);
}
