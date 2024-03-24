import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import config from 'react-native-ultimate-config';
import storage from 'react-exo/storage';
import history from 'common/store/history';
import settings from 'modules/settings/store';
import tasks from 'modules/tasks/store';

const reducer = persistReducer({
  key: config.APP_NAME,
  version: config.STORE_VERSION,
  storage: storage.init(`${config.APP_NAME}::redux`, config.STORE_VERSION),
  blacklist: ['router'],
}, combineReducers({
  router: history.context.routerReducer,
  settings: settings.reducer,
  tasks: tasks.reducer,
}));

export const store = configureStore({
  reducer,
  devTools: true,
  middleware: [
    history.context.routerMiddleware,
  ],
});

history.init(store);

export type Reducer = ReturnType<typeof reducer>;
export const getReducer = (reducer: Reducer) => reducer;

export default store;
