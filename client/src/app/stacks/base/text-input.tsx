import {withUnistyles} from 'react-native-unistyles';
import {TextInput as RNTextInput} from 'react-native';

export const TextInput = withUnistyles(RNTextInput, (theme) => ({
  placeholderTextColor: theme.colors.mutedForeground,
}));
