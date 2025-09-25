import {useMemo} from 'react';
import {useTheme} from 'settings/hooks/use-theme';
import {useUnistyles} from 'react-native-unistyles';
import {createStaticNavigation, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useLinkData} from 'app/nav/hooks/use-link-data';
import nav from 'app/nav/root';
import cfg from 'config';

export function Router() {
  const {links} = useLinkData();
  const {theme} = useUnistyles();
  const [scheme] = useTheme();
  const Navigation = useMemo(() =>
    createStaticNavigation(nav(links, theme))
  , [theme, links]);

  return (
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: [
          'https://exo.ult.dev',
          'exo://',
        ],
      }}
      // TODO: map unistyles themes to react-navigation themes
      theme={scheme === 'dark'
        ? DarkTheme
        : DefaultTheme
      }
      documentTitle={{
        enabled: true,
        formatter: (options, _route) => options?.title
          ? `${cfg.APP_NAME} - ${options?.title}`
          : cfg.APP_NAME
      }}
    />
  );
}
