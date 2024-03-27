import {configureStore, combineReducers, Tuple} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {Storage} from 'react-exo/storage';
import {history} from 'react-exo/navigation';


import core from 'mod/core/store';
import tasks from 'mod/tasks/store';
import settings from 'mod/settings/store';

const reducer = persistReducer({
  key: 'exo',
  version: 0,
  storage: Storage.init(`${'exo'}::redux`, 0),
  blacklist: ['core', 'router'],
}, combineReducers({
  router: history.context.routerReducer,
  core: core.reducer,
  tasks: tasks.reducer,
  settings: settings.reducer,
}));

export const store = configureStore({
  reducer,
  devTools: __DEV__,
  middleware: () => new Tuple(
    history.context.routerMiddleware,
  ),
});

history.init(store);

export type Reducer = ReturnType<typeof reducer>;
export const getReducer = (reducer: Reducer) => reducer;

export default store;
