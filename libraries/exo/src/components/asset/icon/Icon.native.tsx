import {Iconify} from 'react-native-iconify';
import type {IconProps} from './Icon.props';

export function Icon(props: IconProps) {
  return (
    <Iconify 
      icon={props.name}
      size={props.size}
      color={props.color}
    />
  );
}
