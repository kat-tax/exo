import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'settings/hooks/use-theme';
import cfg from 'config';

import LayoutApp from 'app/layout';

import ScreenSettings from 'settings/screen-settings';
import ScreenDevDesign from 'dev/screen-design';
import ScreenDevCharts from 'dev/screen-charts';
import ScreenHomeDashboard from 'home/screen-dashboard';
import ScreenHomeShortcut from 'home/screen-shortcut';
import ScreenTasksListAll from 'tasks/screen-list-all';
import ScreenTasksListDetails from 'tasks/screen-list-details';
import ScreenTasksListEdit from 'tasks/screen-list-edit';

export type RootStackParamList = {
  HomeDashboard: undefined;
  HomeShortcut: {id: string};
  TasksListAll: undefined;
  TasksListDetails: {id: string};
  TasksListEdit: {id: string};
  DevDesign: undefined;
  DevCharts: undefined;
  Settings: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    HomeDashboard: ScreenHomeDashboard,
    TasksListAll: ScreenTasksListAll,
    TasksListDetails: ScreenTasksListDetails,
    TasksListEdit: ScreenTasksListEdit,
    HomeShortcut: ScreenHomeShortcut,
    DevDesign: ScreenDevDesign,
    DevCharts: ScreenDevCharts,
    Settings: ScreenSettings,
  },
  screenOptions: {
    headerShown: false,
  },
  screenLayout: LayoutApp,
});

const Navigation = createStaticNavigation(RootStack);

export const Router = () => {
  const [scheme] = useTheme();
  return (
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: [
          'https://exo.ult.dev',
          'exo://',
        ],
      }}
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
      documentTitle={{
        enabled: true,
        formatter: (options, _route) => options?.title
          ? `${cfg.APP_NAME} - ${options?.title}`
          : cfg.APP_NAME
      }}
    />
  )
}
