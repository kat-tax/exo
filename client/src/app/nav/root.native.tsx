import {createTabs} from 'app/lib/nav.tabs';
import {Screen} from 'app/lib/nav';

import type {Theme} from 'app/ui/types';
import type {MenuItemList, RootTabsParamList} from 'app/nav/types';

export default (links: MenuItemList, theme: Theme) => createTabs<RootTabsParamList>({
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
        path: links.HomeDashboard.path,
      },
      options: {
        title: links.HomeDashboard.label,
        tabBarIcon: links.HomeDashboard.iconNative,
      },
    },
    TasksListAll: {
      screen: Screen.Tasks.ListAll,
      linking: {
        path: links.TasksListAll.path,
      },
      options: {
        title: links.TasksListAll.label,
        tabBarIcon: links.TasksListAll.iconNative,
      },
    },
    Settings: {
      screen: Screen.Settings.Settings,
      linking: {
        path: links.Settings.path,
      },
      options: {
        title: links.Settings.label,
        tabBarIcon: links.Settings.iconNative,
      },
    },
  },
});
