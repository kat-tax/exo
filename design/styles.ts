import {StyleSheet} from 'react-native-unistyles';
import {initialTheme, themes, breakpoints} from './theme';

export type AppThemes = {[K in keyof typeof themes]: typeof themes[K]}
export type AppBreakpoints = typeof breakpoints;

export * from 'react-native-unistyles';

StyleSheet.configure({
  themes,
  breakpoints,
  settings: {
    // TODO: function to get initial theme from mmkv
    initialTheme,
  },
});
