import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {ActivityIndicator} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import store from 'common/store';

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
