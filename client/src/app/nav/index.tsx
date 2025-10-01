import {createStaticNavigation} from '@react-navigation/native';
import {useUnistyles} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {useTheme} from 'settings/hooks/use-theme';
import {root} from 'app/nav/root';
import cfg from 'config';

import type {PathConfig} from '@react-navigation/native';
import type {ImageSourcePropType} from 'react-native';

export type RootStackParamList = {
  HomeDashboard: undefined;
  HomeShortcut: {id: string};
  HomeNotFound: undefined;
  TasksListAll: undefined;
  TasksListDetails: {id: string};
  TasksListEdit: {id: string};
  SettingsOverview: undefined;
  SettingsTest: undefined;
  DevDesign: undefined;
  DevCharts: undefined;
};

export const links: Record<string, Array<keyof RootStackParamList>> = {
  tabs: [
    'HomeDashboard',
    'TasksListAll',
    'SettingsOverview',
  ],
  menuTop: [
    'HomeDashboard',
    'TasksListAll',
  ],
  menuDev: [
    'DevDesign',
    'DevCharts',
  ],
  menuFooterIcons: [
    'SettingsOverview',
  ],
} as const;

export function Navigator() {
  const {t} = useLingui();
  const {theme} = useUnistyles();
  const [scheme] = useTheme();
  const Navigation = createStaticNavigation(root({
    HomeDashboard: {
      linking: '',
      options: {
        title: t`Dashboard`,
        icon: 'ph:squares-four',
        tabBarIcon: () => require('./icons/ph-squares-four.png'),
      },
    },
    HomeNotFound: {
      linking: '*',
      options: {
        title: t`Not Found`,
      },
    },
    HomeShortcut: {
      linking: 'shortcut/:id',
      options: {
        title: t`Shortcut`,
      },
    },
    SettingsOverview: {
      linking: 'settings',
      options: {
        title: t`Settings`,
        icon: 'ph:gear',
        tabBarIcon: () => require('./icons/ph-gear.png'),
      },
    },
    SettingsTest: {
      linking: 'test',
      options: {
        title: t`Test`,
      },
    },
    TasksListAll: {
      linking: 'lists',
      options: {
        title: t`Lists`,
        icon: 'ph:list-checks',
        tabBarIcon: () => require('./icons/ph-list-checks.png'),
      },
    },
    TasksListDetails: {
      linking: 'list/:id',
      options: {
        title: t`List Details`,
      },
    },
    TasksListEdit: {
      linking: 'list/:id/edit',
      options: {
        title: t`Edit List`,
      },
    },
    DevDesign: {
      if: () => __DEV__,
      linking: 'design',
      options: {
        title: t`Design`,
        icon: 'ph:palette',
      },
    },
    DevCharts: {
      if: () => __DEV__,
      linking: 'charts',
      options: {
        title: t`Charts`,
        icon: 'ph:chart-line',
      },
    },
  }, theme));

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

export type NavScreens = Record<keyof RootStackParamList, Omit<NavScreenConfig, 'name'>>;
export type NavScreenConfig = {
  if?: () => boolean,
  name: keyof RootStackParamList,
  linking?: string | PathConfig<RootStackParamList>,
  options?: {
    title: string,
    icon?: string,
    tabBarIcon?: () => ImageSourcePropType,
  },
}
