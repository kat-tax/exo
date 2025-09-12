import {withUnistyles} from 'react-native-unistyles';
import {Progress as RNProgress} from 'react-exo/progress';

export const Progress = withUnistyles(RNProgress, (theme) => ({
  progressColor: theme.colors.foreground,
  style: {
    height: __TOUCH__ ? 8 : 6,
    backgroundColor: theme.colors.muted,
  },
}));
