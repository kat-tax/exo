import {createNativeStackNavigator as $} from '@react-navigation/native-stack';
import {createScreens} from 'app/nav/lib/create-screens';
import {createLayout} from 'app/nav/custom/layout';
import {createScreenLayout} from 'app/nav/custom/screen-layout';

import type {Theme} from 'app/ui';
import type {NavScreens, RootStackParamList} from 'app/nav';

export default (screens: NavScreens, theme: Theme) => $<RootStackParamList>({
  screenLayout: createScreenLayout(screens),
  layout: createLayout(screens),
  screens: createScreens(screens, [
    'HomeDashboard',
    'HomeNotFound',
    'HomeShortcut',
    'SettingsOverview',
    'SettingsTest',
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
