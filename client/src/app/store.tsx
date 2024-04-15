import * as Redux from 'react-exo/redux';
import {Storage} from 'react-exo/storage';
import {LoadPage} from 'common/base/LoadPage';
import config from 'config';

import common from 'common/store';
import settings from 'settings/store';
import tasks from 'tasks/store';

export function Store(props: React.PropsWithChildren) {
  return (
    <Redux.Provider store={store} loading={<LoadPage/>}>
      {props.children}
    </Redux.Provider>
  )
}

const reducer = Redux.persistReducer({
  key: config.APP_NAME,
  version: 0,
  storage: Storage.init(`${config.APP_NAME}::redux`, 0),
  blacklist: [
    Redux.history.context.routerReducer.name,
    common.reducer.name,
    // Tip: disable a reducer persisting to disk here...
  ],
}, Redux.combineReducers({
  router: Redux.history.context.routerReducer,
  common: common.reducer,
  settings: settings.reducer,
  tasks: tasks.reducer,
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
export default store;
