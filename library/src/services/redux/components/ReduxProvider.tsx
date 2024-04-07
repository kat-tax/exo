import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import type {ProviderProps} from 'react-redux';

export interface ReduxProviderProps extends ProviderProps {
  loading?: React.ReactNode,
}

export function ReduxProvider(props: ReduxProviderProps): JSX.Element {
  return (
    <Provider {...props}>
      <PersistGate
        persistor={persistStore(props.store)}
        loading={props.loading}>
        {props.children}
      </PersistGate>
    </Provider>
  )
}
