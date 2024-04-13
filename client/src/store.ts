import config from 'config';
import * as redux from 'react-exo/redux';
import {Storage} from 'react-exo/storage';

import core from 'core/store';
import tasks from 'tasks/store';
import settings from 'settings/store';

const reducer = redux.persistReducer({
  key: config.APP_NAME,
  version: 0,
  storage: Storage.init(`${config.APP_NAME}::redux`, 0),
  blacklist: [
    redux.history.context.routerReducer.name,
    core.reducer.name,
  ],
}, redux.combineReducers({
  router: redux.history.context.routerReducer,
  core: core.reducer,
  tasks: tasks.reducer,
  settings: settings.reducer,
}));

const store = redux.configureStore({
  reducer,
  devTools: __DEV__,
  middleware: () => new redux.Tuple(
    redux.history.context.routerMiddleware,
  ),
});

redux.history.init(store);

export type State = ReturnType<typeof store.getState>

export default store;
