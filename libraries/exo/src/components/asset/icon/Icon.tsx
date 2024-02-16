import {Icon as Iconify} from '@iconify/react';
import type {IconProps} from './Icon.props';

export function Icon(props: IconProps) {
  return (
    <Iconify
      icon={props.name}
      width={props.size}
      color={props.color}
    />
  );
}
