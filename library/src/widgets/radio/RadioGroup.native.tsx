// import RadioGroupBase from 'react-native-ui-lib/radioGroup';
import {Fragment} from 'react';
import type {RadioGroupComponent, RadioGroupProps} from './RadioGroup.interface';

export const RadioGroup: RadioGroupComponent = (_props: RadioGroupProps) => {
  return (
    <Fragment/>
    // <RadioGroupBase
    //   aria-label={props.label}
    //   initialValue={props.initialValue}
    //   onValueChange={props.onValueChange}
    //   testID={props.testID}>
    //   {props.children}
    // </RadioGroupBase>
  );
}
