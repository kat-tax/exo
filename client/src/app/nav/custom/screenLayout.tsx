import {Suspense} from 'react';
import {Panel} from 'app/ui/panel';

export const ScreenLayout = (props: React.PropsWithChildren) => (
  <Suspense fallback={<Panel/>}>
    {props.children}
  </Suspense>
);
