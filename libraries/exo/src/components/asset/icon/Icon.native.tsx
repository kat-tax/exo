import {Iconify} from 'react-native-iconify';
import type {IconProps} from './Icon.interface';

export function Icon(props: IconProps) {
  return (
    <Iconify
      icon={props.name}
      size={props.size}
      color={props.color}
    />
  );
}
