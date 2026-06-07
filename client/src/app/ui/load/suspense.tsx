import {Suspense as SuspenseBase} from 'react';
//import {Spinner} from './spinner';

import type {SuspenseProps as SuspenseBaseProps} from 'react';

interface SuspenseProps extends SuspenseBaseProps {
  fallback?: React.ReactNode,
}

export function Suspense(props: SuspenseProps) {
  return (
    <SuspenseBase fallback={undefined}>
      {props.children}
    </SuspenseBase>
  );
}
