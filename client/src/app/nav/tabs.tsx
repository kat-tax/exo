import {createTabs} from 'app/nav/lib/tabs';
import {createScreens} from 'app/nav/lib/create-screens';
import {links} from 'app/nav';

import type {Theme} from 'app/ui';
import type {RootStackParamList, NavScreens} from 'app/nav';

export default (screens: NavScreens, theme: Theme) => createTabs<RootStackParamList>({
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
