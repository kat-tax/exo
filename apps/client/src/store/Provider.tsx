import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {ActivityIndicator} from 'react-native';

import store from 'store';

export interface StoreProviderProps {
  children: JSX.Element;
}

export function StoreProvider(props: StoreProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistStore(store)}
        loading={<ActivityIndicator size="large"/>}>
        {props.children}
      </PersistGate>
    </Provider>
  )
}
