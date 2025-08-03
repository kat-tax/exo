import * as $ from 'react-exo/redux';
import cfg from 'config';
import kv from './lib/kv';

import app from 'app/store';

// @ts-ignore
const slices = import.meta.glob('./**/store.ts', {
  import: 'default',
  eager: true,
});

console.log(slices);

const reducer = $.persistReducer({
  key: cfg.APP_NAME,
  version: cfg.STORE_VERSION,
  storage: kv,
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
export const useSet = $.useDispatch.withTypes<typeof store.dispatch>();
export const useGet = $.useSelector.withTypes<State>();
export const history = $.history.state;
export default store;
