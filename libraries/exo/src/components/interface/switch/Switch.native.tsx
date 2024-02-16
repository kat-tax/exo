import {Switch as SwitchBase} from 'react-native';
import type {SwitchProps} from './SwitchProps';

export function Switch(props: SwitchProps) {
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
