import {useScheme} from 'features/settings/hooks/$useScheme';

export function useTheme() {
  const [scheme] = useScheme();
  const theme = {
    dark: scheme === 'dark',
    colors: {
      background: '#000',
      primary: '#fff',
      card: '#111',
      text: '#fff',
      border: '#222',
      notification: '#000',
    },
  };
  return theme;
}
