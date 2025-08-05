import {Icon as RNIcon} from 'react-exo/icon';
import {withUnistyles} from 'react-native-unistyles';

export const Icon = withUnistyles(RNIcon, (theme) => ({
  color: theme.colors.foreground,
}));
