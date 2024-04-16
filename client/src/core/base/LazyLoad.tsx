import {Suspense} from 'react';
import {PageLoading} from 'core/base/PageLoading';

export function LazyLoad(props: React.PropsWithChildren) {
  return (
    <Suspense fallback={<PageLoading/>}>
      {props.children}
    </Suspense>
  );
}
