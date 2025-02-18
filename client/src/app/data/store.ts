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
  app: app.reducer,
  router: $.history.context.routerReducer,
}));

const store = $.configureStore({
  reducer,
  devTools: __DEV__,
  middleware: () => new $.Tuple(
    $.history.context.routerMiddleware,
  ),
});

$.history.init(store);

export type Store = typeof store;
export type State = ReturnType<typeof store.getState>
export type AppPut = typeof store.dispatch;
export const usePut = $.useDispatch.withTypes<AppPut>();
export const useGet = $.useSelector.withTypes<State>();
export const history = $.history.state;
export default store;
