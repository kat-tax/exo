import {UnistylesRegistry} from 'react-native-unistyles';
export {createStyleSheet, useStyles} from 'react-native-unistyles';
import {themes, breakpoints} from 'ui/theme';

UnistylesRegistry
  .addThemes(themes)
  .addBreakpoints(breakpoints)
  .addConfig({adaptiveThemes: true});

type AppThemes = {[K in keyof typeof themes]: typeof themes[K]};
type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}
