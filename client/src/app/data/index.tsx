import {createUseEvolu, EvoluProvider} from '@evolu/react';
import {Provider as ReduxProvider} from 'react-exo/redux';
import {Spinner} from 'app/ui/base';
import evolu from 'app/lib/evolu.db';
import redux from 'app/lib/redux.db';

export * from '@evolu/react';
export * from 'app/lib/evolu.db';
export * from 'app/lib/redux.db';

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
