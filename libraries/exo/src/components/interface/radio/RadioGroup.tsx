import {StyleSheet, View} from 'react-native';
import * as R from '@radix-ui/react-radio-group';

import type {RadioGroupComponent, RadioGroupProps} from './RadioGroup.interface';
import './Radio.css';

export const RadioGroup: RadioGroupComponent = (props: RadioGroupProps) => {
  const $styles = {
    container: [
      styles.container,
    ],
  };
  return (
    <View style={$styles.container} testID={props.testID}>
      <R.Root
        className="radio-group-root"
        aria-label={props.label}
        name={undefined}
        required={undefined}
        orientation={undefined}
        dir={undefined}
        value={props.initialValue}
        onValueChange={props.onValueChange}>
        {props.children}
      </R.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
});
