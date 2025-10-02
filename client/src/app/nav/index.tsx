import {createStaticNavigation} from '@react-navigation/native';
import {useUnistyles} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {useTheme} from 'settings/hooks/use-theme';
import cfg from 'config';

import {createNativeStackNavigator as createStack} from '@react-navigation/native-stack';
import {createLayout, createScreenLayout, HeaderLeft} from './custom';
import {createScreens} from './lib/create-screens';
import {createTabs} from './lib/tabs';

import type {PathConfig} from '@react-navigation/native';
import type {ImageSourcePropType} from 'react-native';
import type {Theme} from 'app/ui';

export type RootStackParamList = {
  HomeDashboard: undefined;
  HomeShortcut: {id: string};
  HomeNotFound: undefined;
  TasksListAll: undefined;
  TasksListDetails: {id: string};
  TasksListEdit: {id: string};
  SettingsOverview: undefined;
  SettingsStorage: undefined;
  DevDesign: undefined;
  DevCharts: undefined;
};

/** Top level navigation links shown in the drawer menus and tab bars. */
const links: Record<string, Array<keyof RootStackParamList>> = {
  /** Displayed on the native/web tab navigator. */
  tabs: [
    'HomeDashboard',
    'TasksListAll',
    'SettingsOverview',
  ],
  /** The menu items shown at the top of the drawer menu. */
  menuTop: [
    'HomeDashboard',
    'TasksListAll',
  ],
  /** The menu items to show in development only (below the top items in a group). */
  menuDev: [
    'DevDesign',
    'DevCharts',
  ],
  /** The icon buttons displayed in the menu footer. */
  menuFooterIcons: [
    'SettingsStorage',
    'SettingsOverview',
  ],
} as const;

const tabs = (screens: NavScreens, theme: Theme) => createTabs<RootStackParamList>({
  screens: createScreens(screens, links.tabs),
  backBehavior: 'order',
  rippleColor: theme.colors.card,
  activeIndicatorColor: theme.colors.accent,
  screenOptions: {
    tabBarActiveTintColor: theme.colors.foreground,
  },
  tabBarStyle: {
    backgroundColor: theme.colors.neutral,
  },
  tabLabelStyle: {
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    fontSize: theme.font.size,
  },
});

const root = (screens: NavScreens, theme: Theme) => createStack<RootStackParamList>({
  screenLayout: __WEB__ ? createScreenLayout(screens) : undefined,
  layout: __WEB__ ? createLayout(screens, links) : undefined,
  screens: {
    // Native only, add tab navigator
    ... !__WEB__ ? {
      HomeTabs: {
        screen: tabs(screens, theme),
        options: {
          headerShown: false,
        },
      }
    } : {},
    // Add all other screens to stack
    ...createScreens(screens),
  },
  screenOptions: (_props) => ({
    // Example: Hide header if in top level navigation
    // headerShown: !Object.values(links).flat().includes(props.route.name),
    headerShown: true,
    headerTintColor: theme.colors.foreground,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontFamily: theme.font.family,
      fontSize: __WEB__ ? 13 : 16,
      fontWeight: 500,
    },
    // Show the back button on native, but not on web.
    headerBackVisible: !__WEB__,
    // Custom back button component for web.
    headerLeft: __WEB__ ? HeaderLeft : undefined,
    headerStyle: {
      height: 40,
      backgroundColor: theme.colors.background,
    },
  }),
});


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
    SettingsStorage: {
      linking: 'storage',
      options: {
        title: t`Storage`,
        icon: 'ph:database',
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
          border: 'transparent',
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
