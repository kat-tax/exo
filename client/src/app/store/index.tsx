import * as $ from 'react-exo/redux';
import {Storage} from 'react-exo/storage';
import {PageLoading} from 'app/base/PageLoading';
import config from 'config';

import app from './app';
import tasks from 'tasks/store';
import settings from 'settings/store';

export function Store(props: React.PropsWithChildren) {
  return (
    <$.Provider store={store} loading={<PageLoading/>}>
      {props.children}
    </$.Provider>
  )
}

const reducer = $.persistReducer({
  key: config.APP_NAME,
  version: config.STORE_VERSION,
  storage: Storage.init(`${config.APP_NAME}::redux`, config.STORE_VERSION),
  blacklist: [
    $.history.context.routerReducer.name,
    app.reducer.name,
  ],
}, $.combineReducers({
  router: $.history.context.routerReducer,
  app: app.reducer,
  tasks: tasks.reducer,
  settings: settings.reducer,
}));

const store = $.configureStore({
  reducer,
  devTools: __DEV__,
  middleware: () => new $.Tuple(
    $.history.context.routerMiddleware,
  ),
});

$.history.init(store);

export type State = ReturnType<typeof store.getState>
export const history = $.history.state;
export default store;
