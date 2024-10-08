import * as $ from 'react-exo/redux';
import {KV} from 'react-exo/kv';
import cfg from 'config';
import app from 'app/store';

const reducer = $.persistReducer({
  key: cfg.APP_NAME,
  version: cfg.STORE_VERSION,
  storage: KV.init(
    `${cfg.APP_NAME}::state`,
    cfg.STORE_VERSION,
  ),
  blacklist: [
    'router',
  ],
}, $.combineReducers({
  router: $.history.context.routerReducer,
  app: app.reducer,
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
