import {createTabs} from './lib/nav.tabs';
import {Screen} from './lib/screens';

import type {Theme} from 'app/ui';
import type {RootTabsParamList, NavScreens} from 'app/nav/config';

export default (screens: NavScreens, theme: Theme) => createTabs<RootTabsParamList>({
  backBehavior: 'order',
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
  screens: {
    HomeDashboard: {
      ...screens.HomeDashboard,
      screen: Screen.Home.Dashboard,
    },
    TasksListAll: {
      ...screens.TasksListAll,
      screen: Screen.Tasks.ListAll,
    },
    SettingsOverview: {
      ...screens.SettingsOverview,
      screen: Screen.Settings.Overview,
    },
  },
});
