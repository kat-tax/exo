import {createTabs} from 'app/lib/nav.tabs';
import {Screen} from 'app/lib/nav';

import type {Theme} from 'app/ui/types';
import type {RootTabsParamList} from 'app/nav/types';

export default (theme: Theme) => createTabs<RootTabsParamList>({
  // Functionality
  backBehavior: 'order',
  disablePageAnimations: false,
  // Appearance
  tabBarStyle: {
    backgroundColor: theme.colors.neutral,
  },
  tabLabelStyle: {
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    fontSize: theme.font.size,
  },
  activeIndicatorColor: theme.colors.accent,
  rippleColor: theme.colors.card,
  screenOptions: {
    tabBarActiveTintColor: theme.colors.foreground,
  },
  // Setup
  screens: {
    HomeDashboard: {
      screen: Screen.Home.Dashboard,
      linking: {
        path: '',
      },
      options: {
        tabBarLabel: 'Home',
        tabBarIcon: () => require('./icons/PhSquaresFour.png')
      },
    },
    TasksListAll: {
      screen: Screen.Tasks.ListAll,
      linking: {
        path: 'lists',
      },
      options: {
        tabBarLabel: 'Lists',
        tabBarIcon: () => require('./icons/PhListChecks.png')
      },
    },
    Settings: {
      screen: Screen.Settings.Settings,
      linking: {
        path: 'settings',
      },
      options: {
        tabBarLabel: 'Settings',
        tabBarIcon: () => require('./icons/PhGear.png')
      },
    },
  },
});
