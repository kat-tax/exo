import {Suspense} from 'react';
import {LoadPage} from 'common/base/LoadPage';

export function LazyLoad(props: React.PropsWithChildren) {
  return (
    <Suspense fallback={<LoadPage/>}>
      {props.children}
    </Suspense>
  );
}
