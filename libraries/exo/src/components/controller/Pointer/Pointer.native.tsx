import {Fragment} from 'react';
import type {PointerComponent, PointerProps} from './Pointer.interface';

export const Pointer: PointerComponent = (props: PointerProps) => {
  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
}
