import {Suspense} from 'react';
import {PageLoading} from 'app/base/PageLoading';

export function PageSuspense(props: React.PropsWithChildren) {
  return (
    <Suspense fallback={<PageLoading/>}>
      {props.children}
    </Suspense>
  );
}
