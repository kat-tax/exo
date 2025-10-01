import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import type {NavigationRoute, NavigationHelpers} from '@react-navigation/native';
import type {NavScreenConfig, RootStackParamList} from 'app/nav/config';

export interface MenuItemProps extends Omit<NavScreenConfig, 'path' | 'tabBarIcon'>, React.PropsWithChildren {
  activeRoute: NavigationRoute<RootStackParamList, keyof RootStackParamList>
  navigation: NavigationHelpers<RootStackParamList, {}>,
}

export function useLinkState({activeRoute, name, navigation}: MenuItemProps) {
  const active = activeRoute.name === name;
  const {ref, focused} = useFocusable({
    focusKey: `menu@${name}`,
    onEnterPress: () => navigation.navigate(name as never),
  });

  return {
    ref,
    active,
    focused,
  };
}
