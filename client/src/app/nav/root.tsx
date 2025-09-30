import {createStack} from './lib/nav.stack';
import {Screen} from './lib/screens';
import {Layout} from './custom/layout';
import {ScreenLayout} from './custom/screenLayout';

import type {Theme} from 'app/ui/types';
import type {MenuItemList, RootStackParamList} from './types';

export default (links: MenuItemList, theme: Theme) => createStack<RootStackParamList>({
  layout: Layout,
  screenLayout: ScreenLayout,
  screenOptions: {
    headerShown: false,
    headerTintColor: theme.colors.foreground,
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
  },
  screens: {
    HomeDashboard: {
      screen: Screen.Home.Dashboard,
      linking: links.HomeDashboard.linking,
      options: links.HomeDashboard.options,
    },
    HomeShortcut: {
      screen: Screen.Home.Shortcut,
      linking: links.HomeShortcut.linking,
      options: links.HomeShortcut.options,
    },
    NotFound: {
      screen: Screen.Home.NotFound,
      linking: links.NotFound.linking,
      options: links.NotFound.options,
    },
    Settings: {
      screen: Screen.Settings.Settings,
      linking: links.Settings.linking,
      options: links.Settings.options,
    },
    TasksListAll: {
      screen: Screen.Tasks.ListAll,
      linking: links.TasksListAll.linking,
      options: links.TasksListAll.options,
    },
    TasksListDetails: {
      screen: Screen.Tasks.ListDetails,
      linking: links.TasksListDetails.linking,
      options: links.TasksListDetails.options,
    },
    TasksListEdit: {
      screen: Screen.Tasks.ListEdit,
      linking: links.TasksListEdit.linking,
      options: links.TasksListEdit.options,
    },
    DevDesign: {
      if: () => __DEV__,
      screen: Screen.Dev.Design,
      linking: links.DevDesign.linking,
      options: links.DevDesign.options,
    },
    DevCharts: {
      if: () => __DEV__,
      screen: Screen.Dev.Charts,
      linking: links.DevCharts.linking,
      options: links.DevCharts.options,
    },
  },
});
