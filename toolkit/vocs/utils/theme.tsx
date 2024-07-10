import {useEffect} from 'react';
import {UnistylesRuntime} from 'design/gen.styles';

export function ThemeSwitcher(): React.ReactNode {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const pickerButton = document.querySelector('button:has(.vocs_utils_visibleDark)');
    const updateTheme = () => {
      requestAnimationFrame(() => {
        const isDark = document.documentElement.classList.contains('dark');
        UnistylesRuntime.setTheme(isDark ? 'dark' : 'light');
      })
    };
    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    pickerButton?.addEventListener('click', updateTheme);
    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
      pickerButton?.removeEventListener('click', updateTheme);
    }
  }, []);
  return null;
}
