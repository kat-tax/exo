import * as $ from 'react-exo/redux';
import cfg from 'config';
import kv from './lib/kv';
import _ from './lib/slices';

const reducer = $.persistReducer({
  key: cfg.APP_NAME,
  version: cfg.STORE_VERSION,
  storage: kv,
  blacklist: ['router'],
}, $.combineReducers({..._, router: $.history.context.routerReducer}));

const store = $.configureStore({
  reducer,
  devTools: __DEV__,
  middleware: () => new $.Tuple(
    $.history.context.routerMiddleware,
  ),
});

$.history.init(store);

export type ReduxStore = typeof store;
export type ReduxState = ReturnType<typeof store.getState>
export const useSet = $.useDispatch.withTypes<typeof store.dispatch>();
export const useGet = $.useSelector.withTypes<ReduxState>();
export const history = $.history.state;
export default store;
