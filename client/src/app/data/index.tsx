import {createEvolu, getOrThrow, SimpleName} from '@evolu/common';
import {createUseEvolu, EvoluProvider} from '@evolu/react';
import {Provider as ReduxProvider} from 'react-exo/redux';
import {Spinner} from 'app/stacks/load';
import evoluDeps from './lib/evolu';
import schema from './schema';
import store from './store';
import cfg from 'config';

const evolu = createEvolu(evoluDeps)(schema, {
  name: getOrThrow(SimpleName.from(cfg.APP_NAME)),
  syncUrl: cfg.SYNC_HOST,
});

export const useEvolu = createUseEvolu(evolu);

export function Data(props: React.PropsWithChildren) {
  return (
    <ReduxProvider store={store} loading={<Spinner/>}>
      <EvoluProvider value={evolu}>
        {props.children}
      </EvoluProvider>
    </ReduxProvider>
  )
}
