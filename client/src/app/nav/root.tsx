import {createNativeStackNavigator as createStack} from '@react-navigation/native-stack';
import {createScreens} from 'app/nav/lib/create-screens';
import {createTabs} from 'app/nav/lib/tabs';
import {createLayout} from 'app/nav/custom/layout';
import {createScreenLayout} from 'app/nav/custom/screen-layout';
import {links} from 'app/nav';

import type {Theme} from 'app/ui';
import type {NavScreens, RootStackParamList} from 'app/nav';

export const root = (screens: NavScreens, theme: Theme) => createStack<RootStackParamList>({
  screenLayout: __WEB__ ? createScreenLayout(screens) : undefined,
  layout: __WEB__ ? createLayout(screens) : undefined,
  screens: {
    ...createScreens(screens),
    ... !__WEB__ ? {HomeDashboard: tabs(screens, theme)} : {},
  },
  screenOptions: (route) => ({
    headerShown: !__WEB__ && route.route.name !== 'HomeDashboard',
    headerTintColor: theme.colors.foreground,
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
  }),
});

export const tabs = (screens: NavScreens, theme: Theme) => createTabs<RootStackParamList>({
  screens: createScreens(screens, links.tabs),
  backBehavior: 'order',
  rippleColor: theme.colors.card,
  activeIndicatorColor: theme.colors.accent,
  screenOptions: {
    tabBarActiveTintColor: theme.colors.foreground,
  },
  tabBarStyle: {
    backgroundColor: theme.colors.neutral,
  },
  tabLabelStyle: {
    fontFamily: theme.font.family,
    fontWeight: theme.font.weight,
    fontSize: theme.font.size,
  },
});
