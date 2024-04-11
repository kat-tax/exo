import {Suspense} from 'react';

export function Load(props: React.PropsWithChildren): React.ReactNode {
  return (
    <Suspense fallback={<></>}>
      {props.children}
    </Suspense>
  );
}
