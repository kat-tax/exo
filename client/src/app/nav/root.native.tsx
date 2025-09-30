import {createTabs} from 'app/lib/nav.tabs';
import {Screen} from 'app/lib/nav';

import type {Theme} from 'app/ui/types';
import type {MenuItemList, RootTabsParamList} from 'app/nav/types';

export default (links: MenuItemList, theme: Theme) => createTabs<RootTabsParamList>({
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
      screen: Screen.Home.Dashboard,
      linking: links.HomeDashboard.linking,
      options: links.HomeDashboard.options,
    },
    TasksListAll: {
      screen: Screen.Tasks.ListAll,
      linking: links.TasksListAll.linking,
      options: links.TasksListAll.options,
    },
    Settings: {
      screen: Screen.Settings.Settings,
      linking: links.Settings.linking,
      options: links.Settings.options,
    },
  },
});
