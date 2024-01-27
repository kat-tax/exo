import {StyleSheet, View} from 'react-native';
import * as C from '@radix-ui/react-checkbox';

import './Checkbox.css';
import type {CheckboxProps} from './CheckboxProps';

export function Checkbox(props: CheckboxProps) {
  const $styles = {
    container: [
      styles.container,
      props.style,
    ],
  };
  return (
    <View style={$styles.container} testID={props.testID}>
      <C.Root
        className="checkbox-root"
        id={props.id}
        name={undefined}
        required={undefined}
        disabled={props.disabled}
        checked={props.value}
        onCheckedChange={props.onValueChange}>
        <C.Indicator className="checkbox-indicator">
          {props.icon}
        </C.Indicator>
      </C.Root>
      <label className="checkbox-label" htmlFor={props.id}>
        {props.label}
      </label>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});
