import {createNativeStackNavigator as $} from '@react-navigation/native-stack';
import {createScreens} from './lib/create-screens';
import {createLayout} from './custom/layout';
import {createScreenLayout} from './custom/screen-layout';

import type {Theme} from 'app/ui';
import type {NavScreens, RootStackParamList} from '.';

export default (screens: NavScreens, theme: Theme) => $<RootStackParamList>({
  screenLayout: createScreenLayout(screens),
  layout: createLayout(screens),
  screens: createScreens(screens, [
    'HomeDashboard',
    'HomeNotFound',
    'HomeShortcut',
    'SettingsOverview',
    'TasksListAll',
    'TasksListDetails',
    'TasksListEdit',
    'DevDesign',
    'DevCharts',
  ]),
  screenOptions: {
    headerShown: false,
    headerTintColor: theme.colors.foreground,
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
  },
});
