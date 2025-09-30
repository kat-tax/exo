import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import type {MenuItemProps} from 'app/nav/types';

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
