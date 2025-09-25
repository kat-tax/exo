import {createTabs} from 'app/lib/nav.tabs';
import {Screen} from 'app/lib/nav';

import type {Theme} from 'app/ui/types';
import type {RootTabsParamList} from 'app/nav/types';
import type {MenuItemList} from 'app/nav/menu/menu-item';

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
        tabBarIcon: () => require('./icons/PhSquaresFour.png')
      },
    },
    TasksListAll: {
      screen: Screen.Tasks.ListAll,
      linking: {
        path: links.TasksListAll.path,
      },
      options: {
        title: links.TasksListAll.label,
        tabBarIcon: () => require('./icons/PhListChecks.png')
      },
    },
    Settings: {
      screen: Screen.Settings.Settings,
      linking: {
        path: links.Settings.path,
      },
      options: {
        title: links.Settings.label,
        tabBarIcon: () => require('./icons/PhGear.png')
      },
    },
  },
});
