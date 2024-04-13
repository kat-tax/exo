import RadioButtonBase from 'react-native-ui-lib/radioButton';
import type {RadioButtonComponent, RadioButtonProps} from './RadioButton.interface';

export const RadioButton: RadioButtonComponent = (props: RadioButtonProps) => {
  return (
    <RadioButtonBase {...props}/>
  );
}
