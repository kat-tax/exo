import * as $ from 'react-exo/redux';
import {KV} from 'react-exo/kv';
import cfg from 'config';
import slices from './redux.slices';

const redux = $.configureStore({
  devTools: __DEV__,
  reducer: $.persistReducer({
    key: cfg.APP_NAME,
    version: cfg.STORE_VERSION,
    blacklist: ['router'],
    storage: KV.init(
      `${cfg.APP_NAME}::state`,
      cfg.STORE_VERSION,
    ),
  }, $.combineReducers({
    ...slices,
    router: $.history.context.routerReducer,
  })),
  middleware: () => new $.Tuple(
    $.history.context.routerMiddleware,
  ),
});

$.history.init(redux);

export type ReduxStore = typeof redux;
export type ReduxState = ReturnType<typeof redux.getState>
export const useSet = $.useDispatch.withTypes<typeof redux.dispatch>();
export const useGet = $.useSelector.withTypes<ReduxState>();
export const history = $.history.state;

export default redux;
