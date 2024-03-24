import {createMemoryHistory, createBrowserHistory} from 'history';
import {createReduxHistoryContext} from 'redux-first-history';
import {isWeb} from 'common/utils/platform';

import type {History} from 'history';
import type {Store} from 'redux';

export let state: History & {listenObject: boolean};

export const context = createReduxHistoryContext({
  reduxTravelling: true,
  history: isWeb()
    ? createBrowserHistory()
    : createMemoryHistory(),
});

export const init = (store: Store) => {
  state = context.createReduxHistory(store);
}

export default {init, context};
