import CheckboxBase from 'react-native-ui-lib/checkbox';
import type {CheckboxComponent, CheckboxProps} from './Checkbox.interface';

export const Checkbox: CheckboxComponent = (props: CheckboxProps) => {
  return (
    <CheckboxBase {...props}/>
  );
}
