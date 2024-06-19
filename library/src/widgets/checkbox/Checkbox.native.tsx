import {StyleSheet} from 'react-native';
import CheckboxBase from '@react-native-community/checkbox';

import type {CheckboxComponent, CheckboxProps} from './Checkbox.interface';

export const Checkbox: CheckboxComponent = (props: CheckboxProps) => {
  const colorBox = props.boxColor || '#000';
  const colorBoxOn = props.boxColorOn || '#000';
  const colorIndicator = props.indicatorColor || '#fff';
  return (
    <CheckboxBase
      style={[styles.root, props.style]}
      testID={props.testID}
      forwardedRef={props.refNative}
      value={props.value}
      disabled={props.disabled}
      onValueChange={props.onValueChange}
      tintColors={{false: colorBox, true: colorBoxOn}}
      tintColor={colorBox}
      onTintColor={colorBoxOn}
      onCheckColor={colorIndicator}
      onFillColor={'transparent'}
      onAnimationType={'stroke'}
      offAnimationType={'stroke'}
      animationDuration={0.5}
      hideBox={false}
      boxType={'square'}
      lineWidth={1}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
});
