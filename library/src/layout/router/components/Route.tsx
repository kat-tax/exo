import {Suspense} from 'react';
export {Route} from 'react-router';

export function Load(props: React.PropsWithChildren): React.ReactNode {
  return (
    <Suspense fallback={<></>}>
      {props.children}
    </Suspense>
  );
}
