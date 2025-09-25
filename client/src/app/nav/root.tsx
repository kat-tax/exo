import {createStack} from 'app/lib/nav.stack';
import {Layout} from 'app/nav/layout';
import {Screen} from 'app/lib/nav';
import {Suspend} from 'app/ui/base';

import type {Theme} from 'app/ui/types';
import type {RootStackParamList} from 'app/nav/types';
import type {MenuItemList} from 'app/nav/menu/menu-item';

export default (links: MenuItemList, theme: Theme) => createStack<RootStackParamList>({
  layout: Layout,
  screenLayout: Suspend,
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
      linking: {
        path: links.HomeDashboard.path,
      },
      options: {
        title: links.HomeDashboard.label,
      },
    },
    HomeShortcut: {
      screen: Screen.Home.Shortcut,
      linking: {
        path: links.HomeShortcut.path,
      },
      options: {
        title: links.HomeShortcut.label,
      },
    },
    NotFound: {
      screen: Screen.Home.NotFound,
      linking: {
        path: links.NotFound.path,
      },
      options: {
        title: links.NotFound.label,
      },
    },
    Settings: {
      screen: Screen.Settings.Settings,
      linking: {
        path: links.Settings.path,
      },
      options: {
        title: links.Settings.label,
      },
    },
    TasksListAll: {
      screen: Screen.Tasks.ListAll,
      linking: {
        path: links.TasksListAll.path,
      },
      options: {
        title: links.TasksListAll.label,
      },
    },
    TasksListDetails: {
      screen: Screen.Tasks.ListDetails,
      linking: {
        path: links.TasksListDetails.path,
      },
      options: {
        title: links.TasksListDetails.label,
      },
    },
    TasksListEdit: {
      screen: Screen.Tasks.ListEdit,
      linking: {
        path: links.TasksListEdit.path,
      },
      options: {
        title: links.TasksListEdit.label,
      },
    },
    DevDesign: {
      if: () => __DEV__,
      screen: Screen.Dev.Design,
      linking: {
        path: links.DevDesign.path,
      },
      options: {
        title: links.DevDesign.label,
      },
    },
    DevCharts: {
      if: () => __DEV__,
      screen: Screen.Dev.Charts,
      linking: {
        path: links.DevCharts.path,
      },
      options: {
        title: links.DevCharts.label,
      },
    },
  },
});
