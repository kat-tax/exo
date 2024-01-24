import {Icon as Iconify} from '@iconify/react';

export interface IconProps {
  name: string,
  size?: number,
  color?: string,
}

export function Icon(props: IconProps) {
  return (
    <Iconify
      icon={props.name}
      width={props.size}
      color={props.color}
    />
  );
}
