import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import type {MenuItemProps, MenuItemState} from './menu-item';

export function useLinkState(props: MenuItemProps) {
  const {ref, focused} = useFocusable({
    focusKey: `menu@${props.path}`,
    onEnterPress: () => props.navigation.navigate(props.path as never),
  });

  const active = props.activeRoute.name === props.path;
  const state: MenuItemState = active ? 'Active' : focused ? 'Focused' : 'Default';

  return {
    ref,
    state,
    active,
    focused,
  };
}
