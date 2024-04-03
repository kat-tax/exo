import {Switch as SwitchBase} from 'react-native';
import type {SwitchComponent, SwitchProps} from './Switch.interface';

export const Switch: SwitchComponent = (props: SwitchProps) => {
  return (
    <SwitchBase
      testID={props.testID}
      disabled={props.disabled}
      value={props.value}
      onValueChange={props.onValueChange}
      trackColor={{
        true: props.onColor || '#000',
        false: props.offColor || '#d2d6d8',
      }}
      ios_backgroundColor={props.offColor || '#d2d6d8'}
      thumbColor={props.thumbColor || '#fff'}
      style={props.style}
    />
  );
}
