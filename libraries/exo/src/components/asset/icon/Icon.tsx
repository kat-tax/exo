import {Icon as Iconify} from '@iconify/react';
import type {IconProps} from './Icon.interface';

export function Icon(props: IconProps) {
  return (
    <Iconify
      icon={props.name}
      width={props.size}
      color={props.color}
    />
  );
}
