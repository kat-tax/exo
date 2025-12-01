import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import type {NavigationRoute, NavigationHelpers} from '@react-navigation/native';
import type {NavScreenConfig, RootStackParamList} from 'app/nav';

export interface MenuItemProps extends Omit<NavScreenConfig, 'path' | 'tabBarIcon'>, React.PropsWithChildren {
  activeRoute: NavigationRoute<RootStackParamList, keyof RootStackParamList>
  navigation: NavigationHelpers<RootStackParamList, {}>,
  params?: any, // TODO: type this
}

export function useLinkState({activeRoute, name, navigation, params, options}: MenuItemProps) {
  const active = options?.isActive
    ? options.isActive(activeRoute.name)
    : activeRoute.name === name;
  const {ref, focused} = useFocusable({
    focusKey: `menu-${name}`,
    onEnterPress: () => navigation.navigate(name, params),
  });

  return {
    ref,
    active,
    focused,
  };
}
