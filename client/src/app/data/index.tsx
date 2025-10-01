import {createUseEvolu, EvoluProvider} from '@evolu/react';
import {Provider as ReduxProvider} from 'react-exo/redux';
import evolu from './lib/evolu.db';
import redux from './lib/redux.db';

export * from '@evolu/react';
export * from './lib/evolu.db';
export * from './lib/redux.db';

export const useEvolu = createUseEvolu(evolu);

export function Data(props: React.PropsWithChildren) {
  return (
    <ReduxProvider store={redux}>
      <EvoluProvider value={evolu}>
        {props.children}
      </EvoluProvider>
    </ReduxProvider>
  )
}
