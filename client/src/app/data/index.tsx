import {createUseEvolu, EvoluProvider} from '@evolu/react';
import {Provider as ReduxProvider} from 'react-exo/redux';
import {Spinner} from 'app/stacks/load';
import evolu from './provider/evolu';
import redux from './provider/redux';

export * from './provider/redux';
export * from './queries';
export * from './types';

export const useEvolu = createUseEvolu(evolu);

export function Data(props: React.PropsWithChildren) {
  return (
    <ReduxProvider store={redux} loading={<Spinner/>}>
      <EvoluProvider value={evolu}>
        {props.children}
      </EvoluProvider>
    </ReduxProvider>
  )
}
