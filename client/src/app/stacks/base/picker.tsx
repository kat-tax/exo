import {withUnistyles} from 'react-native-unistyles';
import {Picker as RNPicker} from 'react-exo/picker';

export const Picker = withUnistyles(RNPicker, (theme) => ({
  dropdownIconColor: theme.colors.foreground,
})) as unknown as typeof RNPicker;

Picker.Item = withUnistyles(RNPicker.Item, (theme) => ({
  color: theme.colors.foreground,
}));
