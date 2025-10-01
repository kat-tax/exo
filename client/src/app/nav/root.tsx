import {layout, screenLayout} from './custom';
import {createStack} from './lib/nav.stack';
import {Screen} from './lib/screens';

import type {Theme} from 'app/ui';
import type {NavScreens, RootStackParamList} from 'app/nav/config';

export default (screens: NavScreens, theme: Theme) => createStack<RootStackParamList>({
  layout: layout(screens),
  screenLayout,
  screenOptions: {
    headerShown: false,
    headerTintColor: theme.colors.foreground,
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
  },
  screens: {
    HomeDashboard: {
      ...screens.HomeDashboard,
      screen: Screen.Home.Dashboard,
    },
    HomeNotFound: {
      ...screens.HomeNotFound,
      screen: Screen.Home.NotFound,
    },
    HomeShortcut: {
      ...screens.HomeShortcut,
      screen: Screen.Home.Shortcut,
    },
    SettingsOverview: {
      ...screens.SettingsOverview,
      screen: Screen.Settings.Overview,
    },
    TasksListAll: {
      ...screens.TasksListAll,
      screen: Screen.Tasks.ListAll,
    },
    TasksListDetails: {
      ...screens.TasksListDetails,
      screen: Screen.Tasks.ListDetails,
    },
    TasksListEdit: {
      ...screens.TasksListEdit,
      screen: Screen.Tasks.ListEdit,
    },
    DevDesign: {
      ...screens.DevDesign,
      screen: Screen.Dev.Design,
    },
    DevCharts: {
      ...screens.DevCharts,
      screen: Screen.Dev.Charts,
    },
  },
});
