import {useMemo} from 'react';
import {useTheme} from 'settings/hooks/use-theme';
import {useUnistyles} from 'react-native-unistyles';
import {createStaticNavigation} from '@react-navigation/native';
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
      theme={{
        dark: scheme === 'dark',
        colors: {
          background: theme.colors.background,
          border: theme.colors.border,
          card: theme.colors.card,
          text: theme.colors.foreground,
          primary: theme.colors.primary,
          notification: theme.colors.accent,
        },
        fonts: {
          regular: {
            fontFamily: theme.font.family,
            fontWeight: theme.typography.weightRegular,
          },
          medium: {
            fontFamily: theme.font.family,
            fontWeight: theme.typography.weightMedium,
          },
          bold: {
            fontFamily: theme.font.family,
            fontWeight: theme.typography.weightSemiBold,
          },
          heavy: {
            fontFamily: theme.font.family,
            fontWeight: theme.typography.weightBold,
          },
        }
      }}
      documentTitle={{
        enabled: true,
        formatter: (options, _route) => options?.title
          ? `${cfg.APP_NAME} - ${options?.title}`
          : cfg.APP_NAME
      }}
    />
  );
}
