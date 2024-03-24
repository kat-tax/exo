import {UnistylesRegistry} from 'react-native-unistyles';
import {themes, breakpoints} from 'ui/theme';

export {useStyles, createStyleSheet} from 'react-native-unistyles';

export default UnistylesRegistry
  .addThemes(themes)
  .addBreakpoints(breakpoints)
  .addConfig({adaptiveThemes: true});

export type AppThemes = {[K in keyof typeof themes]: typeof themes[K]};
export type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}
