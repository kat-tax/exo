import {useMemo} from 'react';
import {useTheme} from 'settings/hooks/use-theme';
import {useUnistyles} from 'react-native-unistyles';
import {createStaticNavigation} from '@react-navigation/native';
import {useScreens} from 'app/nav/use-screens';
import nav from 'app/nav/root';
import cfg from 'config';

import type {PathConfig} from '@react-navigation/native';
import type {ImageSourcePropType} from 'react-native';

export type RootStackParamList = {
  HomeDashboard: undefined;
  HomeShortcut: {id: string};
  TasksListAll: undefined;
  TasksListDetails: {id: string};
  TasksListEdit: {id: string};
  DevDesign: undefined;
  DevCharts: undefined;
  Settings: undefined;
  NotFound: undefined;
};

export type RootTabsParamList = {
  HomeDashboard: undefined;
  TasksListAll: undefined;
  Settings: undefined;
};

export type NavScreens = Record<
  keyof RootStackParamList,
  Omit<NavScreenConfig, 'name'>
>;

export type NavScreenConfig = {
  if?: () => boolean | undefined,
  name: keyof RootStackParamList,
  linking?: string | PathConfig<RootStackParamList | RootTabsParamList>,
  options?: {
    title: string,
    icon?: string,
    tabBarIcon?: () => ImageSourcePropType,
  },
}

export function Navigator() {
  const {links} = useScreens();
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
      documentTitle={{
        enabled: true,
        formatter: (options, _route) => options?.title
          ? `${cfg.APP_NAME} - ${options?.title}`
          : cfg.APP_NAME
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
    />
  );
}
