import {Iconify} from 'react-native-iconify';
import type {IconComponent, IconProps} from './Icon.interface';

export const Icon: IconComponent = (props: IconProps) => {
  return (
    <Iconify
      icon={props.name}
      size={props.size}
      color={props.color}
    />
  );
}
