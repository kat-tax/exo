import {useState, useLayoutEffect} from 'react';
import {Router as RouterBase} from 'react-router';

import type {History} from 'history';

export interface RouterProps {
  history: History,
  basename?: string,
  children?: React.ReactNode,
}

export function Router({basename, children, history}: RouterProps): React.ReactNode {
  const [state, setState] = useState({
    location: history.location,
    action: history.action,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <RouterBase
      navigator={history}
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
    />
  );
}

if (__DEV__) {
  Router.displayName = 'Router';
}
