import {Icon as Iconify} from '@iconify/react';
import type {IconComponent, IconProps} from './Icon.interface';

/** A component that can display over 200,000 icons via [Iconify](https://icon-sets.iconify.design) */
export const Icon: IconComponent = (props: IconProps) => {
  return (
    <Iconify
      icon={props.name}
      width={props.size}
      color={props.color}
    />
  );
}
