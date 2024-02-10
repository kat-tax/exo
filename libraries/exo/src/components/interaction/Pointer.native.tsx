import {Fragment} from 'react';
import type {PointerProps} from './Pointer';

export function Pointer(props: PointerProps) {
  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
}
