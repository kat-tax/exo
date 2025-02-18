import {UnistylesRegistry, UnistylesRuntime} from 'react-native-unistyles';
import {initialTheme, themes, breakpoints} from 'design/theme';
import {useLayoutEffect} from 'react';

export type AppThemes = {[K in keyof typeof themes]: typeof themes[K]}
export type AppBreakpoints = typeof breakpoints;

export const registry = UnistylesRegistry
  .addThemes(themes)
  .addBreakpoints(breakpoints)
  .addConfig({
    initialTheme,
  });

export default function Layout(props: React.PropsWithChildren) {
  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const pickerButton = document.querySelector('button:has(.vocs_utils_visibleDark)');
    const updateTheme = () => {
      requestAnimationFrame(() => {
        const isDark = document.documentElement.classList.contains('dark');
        UnistylesRuntime.setTheme(isDark ? 'dark' : 'light');
      })
    };
    mediaQuery.addEventListener('change', updateTheme);
    pickerButton?.addEventListener('click', updateTheme);
    updateTheme();
    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
      pickerButton?.removeEventListener('click', updateTheme);
    }
  }, []);
  return props.children;
}
