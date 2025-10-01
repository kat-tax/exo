import {Suspense} from 'react';
import {Panel} from 'app/ui/panel';

import type {NavScreens} from 'app/nav';

export const createScreenLayout = (_screens: NavScreens) => (
  (props: React.PropsWithChildren) => (
    <Suspense fallback={<Panel/>}>
      {props.children}
    </Suspense>
  )
);
