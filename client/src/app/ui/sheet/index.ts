import {Sheet as SheetX} from './Sheet';
import {withUnistyles} from 'react-native-unistyles';

export type {SheetProps, SheetHandle} from './Sheet.base';

export const Sheet = withUnistyles(SheetX, (theme) => ({
  backgroundColor: theme.colors.background,
  grabberProps: {
    color: theme.colors.input,
  },
}));
