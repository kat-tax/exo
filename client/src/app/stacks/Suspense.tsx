import {Suspense as SuspenseBase} from 'react';
import {Spinner} from './Spinner';

import type {SuspenseProps as SuspenseBaseProps} from 'react';

interface SuspenseProps extends SuspenseBaseProps {
  fallback?: React.ReactNode,
}

export function Suspense(props: SuspenseProps) {
  return (
    <SuspenseBase fallback={<Spinner/>}>
      {props.children}
    </SuspenseBase>
  );
}
