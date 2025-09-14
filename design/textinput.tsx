import {TextInput as RNTextInput} from 'react-native';
import {withUnistyles} from 'react-native-unistyles';

export const TextInput = withUnistyles(RNTextInput, (theme) => ({
  placeholderTextColor: theme.colors.mutedForeground,
}));
