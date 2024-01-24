import {Iconify} from 'react-native-iconify';

export interface IconProps {
  name: string,
  size?: number,
  color?: string,
}

export function Icon(props: IconProps) {
  return (
    <Iconify 
      icon={props.name}
      size={props.size}
      color={props.color}
    />
  );
}
