import {Switch as SwitchBase} from 'react-native';
import type {SwitchComponent, SwitchProps} from './Switch.interface';

export const Switch: SwitchComponent = (props: SwitchProps) => {
  return (
    <SwitchBase
      style={props.style}
      testID={props.testID}
      value={props.value}
      disabled={props.disabled}
      onValueChange={props.onValueChange}
      ios_backgroundColor={props.offColor || '#d2d6d8'}
      thumbColor={props.thumbColor || '#fff'}
      trackColor={{
        true: props.onColor || '#000',
        false: props.offColor || '#d2d6d8',
      }}
    />
  );
}
