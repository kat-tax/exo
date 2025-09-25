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
        tabBarIcon: __NATIVE__ ? () => require('./icons/PhSquaresFour.png') : undefined,
      },
    },
    TasksListAll: {
      screen: Screen.Tasks.ListAll,
      linking: {
        path: 'lists',
      },
      options: {
        tabBarLabel: 'Lists',
        tabBarIcon: __NATIVE__ ? () => require('./icons/PhListChecks.png') : undefined,
      },
    },
    Settings: {
      screen: Screen.Settings.Settings,
      linking: {
        path: 'settings',
      },
      options: {
        tabBarLabel: 'Settings',
        tabBarIcon: __NATIVE__ ? () => require('./icons/PhGear.png') : undefined,
      },
    },
  },
});
