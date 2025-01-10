import {useRef, useEffect} from 'react';
import type {UnistylesRuntime} from 'react-native-unistyles';

export default function Layout(props: React.PropsWithChildren) {
  const runtime = useRef<typeof UnistylesRuntime>();

  useEffect(() => {
    import('design/styles').then(({UnistylesRuntime}) => {
      runtime.current = UnistylesRuntime;
      runtime.current.setTheme(getTheme());
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const pickerButton = document.querySelector('button:has(.vocs_utils_visibleDark)');
    const updateTheme = () => runtime.current?.setTheme(getTheme());
    mediaQuery.addEventListener('change', updateTheme);
    pickerButton?.addEventListener('click', updateTheme);
    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
      pickerButton?.removeEventListener('click', updateTheme);
    }
  }, []);

  return props.children;
}

const getTheme = () =>
  document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';
