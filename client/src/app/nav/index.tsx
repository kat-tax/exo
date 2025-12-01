import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStaticNavigation} from '@react-navigation/native';
import {useUnistyles} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {useTheme} from 'settings/hooks/use-theme';
import {DeviceId, PathId} from 'app/data/types';

import cfg from 'config';

import {createLayout, createScreenLayout, HeaderLeft} from './custom';
import {createScreens} from './lib/create-screens';
import {createTabs} from './lib/tabs';

import type {PathConfig} from '@react-navigation/native';
import type {ImageSourcePropType} from 'react-native';
import type {Theme} from 'app/ui';

export type RootStackParamList = {
  HomeDashboard: undefined;
  HomeInbox: undefined;
  HomeShortcut: {id: string};
  HomeNotFound: undefined;
  SettingsOverview: undefined;
  SettingsStorage: undefined;
  DevDesign: undefined;
  DevCharts: undefined;
  MediaBrowseDevices: undefined;
  MediaBrowseLocal: {path?: string};
  MediaBrowseEvolu: {pathId?: PathId; deviceId: DeviceId};
  MediaViewDocs: undefined;
  MediaViewMusic: undefined;
  MediaViewPictures: undefined;
  MediaViewVideos: undefined;
  MediaViewGames: undefined;
  MediaViewBooks: undefined;
  MediaViewIpfs: {cid: string; filename?: string};
  WorldOverview: undefined;
  WorldMap: undefined;
  WorldCalendar: undefined;
  WorldTasksAll: undefined;
  WorldTasksEdit: {id: string};
  WorldTasksDetails: {id: string};
};

/** Top level navigation links shown in the drawer menus and tab bars. */
const links: Record<string, Array<keyof RootStackParamList>> = {
  /** Displayed on the native/web tab navigator. */
  tabs: [
    'HomeDashboard',
    'MediaBrowseDevices',
    'WorldOverview',
    'SettingsOverview',
  ],
  /** The menu items shown at the top of the drawer menu. */
  menuTop: [
    'HomeDashboard',
    'HomeInbox',
  ],
  /** The menu items shown in the media group. */
  menuMedia: [
    'MediaBrowseDevices',
    'MediaViewDocs',
    'MediaViewMusic',
    'MediaViewPictures',
    'MediaViewVideos',
    'MediaViewGames',
    'MediaViewBooks',
  ],
  /** The menu items shown in the world group. */
  menuWorld: [
    'WorldMap',
    'WorldTasksAll',
    'WorldCalendar',
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

const root = (screens: NavScreens, theme: Theme) => createNativeStackNavigator<RootStackParamList>({
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
  screenOptions: (props) => ({
    // Hide header if in top level navigation (excluding SettingsStorage)
    // Also hide header if the route is a media view or browse route
    headerShown: (!Object.values(links).flat().includes(props.route.name)
      || props.route.name === 'SettingsStorage')
      && !props.route.name.startsWith('MediaView')
      && !props.route.name.startsWith('MediaBrowse'),
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
    HomeInbox: {
      linking: 'inbox',
      options: {
        title: t`Inbox`,
        icon: 'ph:tray',
      },
    },
    HomeNotFound: {
      linking: {
        alias: ['*'],
        path: '404',
      },
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
    MediaBrowseDevices: {
      linking: 'browse',
      options: {
        title: t`Files`,
        icon: 'ph:folder',
        isActive: (route) => route.startsWith('MediaBrowse'),
      },
    },
    MediaBrowseLocal: {
      linking: {
        path: 'browse/local/:path?',
        parse: {
          path: (value) => value.replaceAll('~', '/').replaceAll('+', ' '),
        },
        stringify: {
          path: (value) => value.replaceAll('/', '~').replaceAll(' ', '+'),
        },
      },
    },
    MediaBrowseEvolu: {
      linking: {
        path: 'browse/:deviceId/:pathId?',
        parse: {
          pathId: (value) => {
            const pathId = PathId.from(value);
            return pathId.ok ? pathId.value : null;
          },
          deviceId: (value) => {
            const deviceId = DeviceId.from(value);
            return deviceId.ok ? deviceId.value : null;
          },
        },
        stringify: {
          pathId: (value) => value.toString(),
          deviceId: (value) => value.toString(),
        },
      },
    },
    MediaViewIpfs: {
      linking: 'ipfs/:cid/:filename',
      options: {
        title: t`IPFS`,
      },
    },
    MediaViewDocs: {
      linking: 'docs',
      options: {
        title: t`Docs`,
        icon: 'ph:file-text',
      },
    },
    MediaViewMusic: {
      linking: 'music',
      options: {
        title: t`Music`,
        icon: 'ph:music-notes',
      },
    },
    MediaViewPictures: {
      linking: 'pictures',
      options: {
        title: t`Pictures`,
        icon: 'ph:image',
      },
    },
    MediaViewVideos: {
      linking: 'videos',
      options: {
        title: t`Videos`,
        icon: 'ph:video',
      },
    },
    MediaViewGames: {
      linking: 'games',
      options: {
        title: t`Games`,
        icon: 'ph:game-controller',
      },
    },
    MediaViewBooks: {
      linking: 'books',
      options: {
        title: t`Books`,
        icon: 'ph:book-open-text',
      },
    },
    WorldOverview: {
      linking: 'world',
      options: {
        title: t`World`,
        icon: 'ph:globe',
      },
    },
    WorldMap: {
      linking: 'map',
      options: {
        title: t`Map`,
        icon: 'ph:map-trifold',
      },
    },
    WorldCalendar: {
      linking: 'calendar',
      options: {
        title: t`Calendar`,
        icon: 'ph:calendar-dots',
      },
    },
    WorldTasksAll: {
      linking: 'tasks',
      options: {
        title: t`Tasks`,
        icon: 'ph:list-checks',
      },
    },
    WorldTasksDetails: {
      linking: 'tasks/:id',
      options: {
        title: t`List Details`,
      },
    },
    WorldTasksEdit: {
      linking: 'tasks/:id/edit',
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
  params?: RootStackParamList[keyof RootStackParamList],
  options?: {
    title: string,
    icon?: string,
    tabBarIcon?: () => ImageSourcePropType,
    isActive?: (routeName: keyof RootStackParamList) => boolean,
  },
}
