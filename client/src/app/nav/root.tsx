import {createNativeStackNavigator as $} from '@react-navigation/native-stack';
import {createScreens} from 'app/nav/lib/create-screens';
import {createLayout} from 'app/nav/custom/layout';
import {createScreenLayout} from 'app/nav/custom/screen-layout';
import tabs from 'app/nav/tabs';

import type {Theme} from 'app/ui';
import type {NavScreens, RootStackParamList} from 'app/nav';

const __CUSTOM__ = !(__IOS__ || __ANDROID__);

export default (screens: NavScreens, theme: Theme) => $<RootStackParamList>({
  screenLayout: __CUSTOM__ ? createScreenLayout(screens) : undefined,
  layout: __CUSTOM__ ? createLayout(screens) : undefined,
  screens: {
    ...createScreens(screens),
    ... !__CUSTOM__ ? {
      HomeDashboard: tabs(screens, theme),
    } : {},
  },
  screenOptions: {
    headerShown: false,
    headerTintColor: theme.colors.foreground,
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
  },
});
