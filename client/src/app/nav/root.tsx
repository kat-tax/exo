import {createStack} from 'app/lib/nav.stack';
import {Layout} from 'app/nav/layout';
import {Screen} from 'app/lib/nav';
import {Suspend} from 'app/ui/base';

import type {Theme} from 'app/ui/types';
import type {RootStackParamList} from 'app/nav/types';

export default (theme: Theme) => createStack<RootStackParamList>({
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
        path: '',
      },
    },
    HomeShortcut: {
      screen: Screen.Home.Shortcut,
      linking: {
        path: 'shortcut/:id',
      },
    },
    NotFound: {
      screen: Screen.Home.NotFound,
      linking: {
        path: '*',
      },
    },
    Settings: {
      screen: Screen.Settings.Settings,
      linking: {
        path: 'settings',
      },
    },
    TasksListAll: {
      screen: Screen.Tasks.ListAll,
      linking: {
        path: 'lists',
      },
    },
    TasksListDetails: {
      screen: Screen.Tasks.ListDetails,
      linking: {
        path: 'list/:id',
      },
    },
    TasksListEdit: {
      screen: Screen.Tasks.ListEdit,
      linking: {
        path: 'list/:id/edit',
      },
    },
    DevDesign: {
      screen: Screen.Dev.Design,
      if: () => __DEV__,
      linking: {
        path: 'design',
      },
    },
    DevCharts: {
      screen: Screen.Dev.Charts,
      if: () => __DEV__,
      linking: {
        path: 'charts',
      },
    },
  },
});
