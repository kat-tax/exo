import RadioGroupBase from 'react-native-ui-lib/radioGroup';
import type {RadioGroupProps} from './RadioGroup.interface';

export function RadioGroup(props: RadioGroupProps) {
  return (
    <RadioGroupBase
      aria-label={props.label}
      initialValue={props.initialValue}
      onValueChange={props.onValueChange}
      testID={props.testID}>
      {props.children}
    </RadioGroupBase>
  );
}
