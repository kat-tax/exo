import {UnistylesRegistry} from 'react-native-unistyles';
import {breakpoints, themes} from 'ui/theme';

export type AppBreakpoints = typeof breakpoints;
export type AppThemes = {[K in keyof typeof themes]: typeof themes[K]};

export {useStyles, createStyleSheet} from 'react-native-unistyles';

export default UnistylesRegistry
  .addBreakpoints(breakpoints)
  .addThemes(themes)
  .addConfig({
    adaptiveThemes: true,
    experimentalCSSMediaQueries: true,
  });
