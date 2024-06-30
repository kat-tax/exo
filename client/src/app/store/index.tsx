import * as Redux from 'react-exo/redux';
import {Storage} from 'react-exo/storage';
import {PageLoading} from 'app/base/PageLoading';
import config from 'config';

import app from './app';
import home from 'home/store';
import tasks from 'tasks/store';
import settings from 'settings/store';
// Tip: import your new reducers here...

export function Store(props: React.PropsWithChildren) {
  return (
    <Redux.Provider store={store} loading={<PageLoading/>}>
      {props.children}
    </Redux.Provider>
  )
}

const reducer = Redux.persistReducer({
  key: config.APP_NAME,
  version: config.STORE_VERSION,
  storage: Storage.init(`${config.APP_NAME}::redux`, config.STORE_VERSION),
  blacklist: [
    Redux.history.context.routerReducer.name,
    app.reducer.name,
    // Tip: disable a reducer persisting to disk here...
  ],
}, Redux.combineReducers({
  router: Redux.history.context.routerReducer,
  app: app.reducer,
  home: home.reducer,
  tasks: tasks.reducer,
  settings: settings.reducer,
  // Tip: add your new reducers here...
}));

const store = Redux.configureStore({
  reducer,
  devTools: __DEV__,
  middleware: () => new Redux.Tuple(
    Redux.history.context.routerMiddleware,
    // Tip: add more middleware here...
  ),
});

Redux.history.init(store);

export type State = ReturnType<typeof store.getState>
export const history = Redux.history.state;
export default store;
