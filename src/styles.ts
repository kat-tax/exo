import {createUnistyles} from 'react-native-unistyles';
import theme, {breakpoints} from './theme';

export const {createStyleSheet, useStyles} = createUnistyles<
  typeof breakpoints,
  typeof theme
>(breakpoints);
