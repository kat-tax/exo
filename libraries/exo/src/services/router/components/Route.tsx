import {Suspense} from 'react';
import {Route as RouteBase} from 'react-router';
import type {RouteProps} from 'react-router';

export function Route(props: RouteProps & {fallback: React.ReactNode}): JSX.Element {
  return (
    <RouteBase {...props} element={
      <Suspense fallback={props.fallback}>
        {props.element}
      </Suspense>
    }/>
  );
}

if (__DEV__) {
  Route.displayName = 'Route';
}
