import {createIdFromString} from '@evolu/common';
import {createUseEvolu, EvoluProvider} from '@evolu/react';
import {Provider as ReduxProvider} from 'react-exo/redux';
import {HfsProvider} from './lib/hfs';
import {DeviceId} from './types';
import evolu from './lib/evolu.db';
import redux from './lib/redux.db';

export * from '@evolu/common';
export * from '@evolu/react';
export * from './lib/evolu.db';
export * from './lib/redux.db';

export const useEvolu = createUseEvolu(evolu);
export const deviceId = DeviceId.orThrow(createIdFromString('device-1'));

evolu.upsert('app_device', {id: deviceId});

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
