import {Picker as PickerBase} from '@react-native-picker/picker';
import type {PickerComponent, PickerProps} from './Picker.interface';

export const Picker: PickerComponent = (props: PickerProps) => {
  return (
    <PickerBase {...props}/>
  );
}
