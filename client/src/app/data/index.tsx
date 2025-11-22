import {createMMKV} from 'react-native-mmkv';
import {createIdFromString} from '@evolu/common';
import {createUseEvolu, EvoluProvider} from '@evolu/react';
import {Provider as ReduxProvider} from 'react-exo/redux';
import {getDeviceName} from 'app/lib/platform';
import {HfsProvider} from 'app/data/lib/hfs';
import {DeviceId} from 'app/data/types';
import {uuid} from 'app/lib/random';
import evolu from 'app/data/lib/evolu.db';
import redux from 'app/data/lib/redux.db';

export * from '@evolu/common';
export * from '@evolu/react';
export * from './lib/evolu.db';
export * from './lib/redux.db';

const _mmkv = createMMKV({id: 'evolu-device'});
let _deviceId = _mmkv.getString('deviceId');
if (!_deviceId) {
  _deviceId = createIdFromString(uuid());
  _mmkv.set('deviceId', _deviceId);
}

export const useEvolu = createUseEvolu(evolu);
export const deviceId = DeviceId.orThrow(_deviceId);
export const deviceName = getDeviceName();
export {evolu};

evolu.upsert('app_device', {id: deviceId, name: deviceName});

export function Data(props: React.PropsWithChildren) {
  return (
    <ReduxProvider store={redux}>
      <EvoluProvider value={evolu}>
        <HfsProvider>
          {props.children}
        </HfsProvider>
      </EvoluProvider>
    </ReduxProvider>
  )
}
