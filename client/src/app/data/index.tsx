
import {createUseEvolu, EvoluProvider} from '@evolu/react';
import {Provider as ReduxProvider} from 'react-exo/redux';
import {HfsProvider} from 'app/data/lib/hfs';
import {device} from 'app/data/lib/device';
import evolu from 'app/data/lib/evolu.db';
import redux from 'app/data/lib/redux.db';

export * from '@evolu/common';
export * from '@evolu/react';
export * from './lib/evolu.db';
export * from './lib/redux.db';

export const useEvolu = createUseEvolu(evolu);
export {evolu};

evolu.upsert('app_device', device);

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
