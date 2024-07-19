import {useEvolu, useQuery} from '@evolu/react-native';
import {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useCoords} from 'app/hooks/useCoords';
import {useOnline} from 'app/hooks/useOnline';
import {device} from 'app/data';
import app from 'app/store/app';

import type {Database} from 'app/data/schema';

export function useDevice() {
  const online = useOnline();
  const evolu = useEvolu<Database>();
  const uuid = useSelector(app.selectors.getDevice);
  const {row} = useQuery(device(uuid));
  const {coords} = useCoords();
  
  useEffect(() => {
    if (!row) {
      evolu.create('device', {
        uuid,
        online,
        coords,
      });
    } else {
      evolu.update('device', {
        id: row?.id,
        uuid,
        online,
        coords,
      });
    }
  }, [uuid, row, coords, online, evolu]);

  // Return memoized values
  return useMemo(
    () => ({id: row?.id, uuid, coords, online}),
    [row?.id, uuid, coords, online],
  );
}
