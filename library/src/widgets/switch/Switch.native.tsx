import {useState} from 'react';
import {Switch as SwitchBase} from 'react-native';
import type {SwitchComponent, SwitchProps} from './Switch.interface';

export const Switch: SwitchComponent = (props: SwitchProps) => {
  const [value, setValue] = useState(props.value);
  return (
    <SwitchBase
      style={props.style}
      testID={props.testID}
      disabled={props.disabled}
      thumbColor={props.thumbColor}
      trackColor={{
        true: props.onColor,
        false: props.offColor,
      }}
      value={value}
      onValueChange={() => {
        setValue(!value);
        if (props.onValueChange) {
          props.onValueChange(!value);
        }
      }}
    />
  );
}
