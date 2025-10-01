import {createNativeBottomTabNavigator as $} from '@bottom-tabs/react-navigation';
import {createScreens} from './lib/create-screens';
import {links} from '.';

import type {Theme} from 'app/ui';
import type {RootStackParamList, NavScreens} from '.';

export default (screens: NavScreens, theme: Theme) => $<RootStackParamList>({
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
