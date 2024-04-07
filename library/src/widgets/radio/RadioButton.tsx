import {StyleSheet, View} from 'react-native';
import * as R from '@radix-ui/react-radio-group';

import type {RadioButtonComponent, RadioButtonProps} from './RadioButton.interface';

export const RadioButton: RadioButtonComponent = (props: RadioButtonProps) => {
  const vstyles = {
    container: [
      styles.container,
    ],
  };

  return (
    <View style={vstyles.container} testID={props.testID}>
      <R.Item
        className="radio-button-item"
        disabled={props.disabled}
        value={props.value}
        id={props.id}>
        <R.Indicator className="radio-button-indicator"/>
      </R.Item>
      <label className="radio-button-label" htmlFor={props.id}>
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
});
