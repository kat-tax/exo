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
      screen: Screen.HomeDashboard,
    },
    HomeNotFound: {
      ...screens.HomeNotFound,
      screen: Screen.HomeNotFound,
    },
    HomeShortcut: {
      ...screens.HomeShortcut,
      screen: Screen.HomeShortcut,
    },
    SettingsOverview: {
      ...screens.SettingsOverview,
      screen: Screen.SettingsOverview,
    },
    TasksListAll: {
      ...screens.TasksListAll,
      screen: Screen.TasksListAll,
    },
    TasksListDetails: {
      ...screens.TasksListDetails,
      screen: Screen.TasksListDetails,
    },
    TasksListEdit: {
      ...screens.TasksListEdit,
      screen: Screen.TasksListEdit,
    },
    DevDesign: {
      ...screens.DevDesign,
      screen: Screen.DevDesign,
    },
    DevCharts: {
      ...screens.DevCharts,
      screen: Screen.DevCharts,
    },
  },
});
