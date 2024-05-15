import * as Redux from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

export interface ProviderProps extends Redux.ProviderProps {
  loading?: React.ReactNode,
}

export function Provider(props: ProviderProps): React.ReactNode {
  return (
    <Redux.Provider {...props}>
      <PersistGate
        persistor={persistStore(props.store)}
        loading={props.loading}>
        {props.children}
      </PersistGate>
    </Redux.Provider>
  )
}
