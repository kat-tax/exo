import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import type {MenuItemProps, MenuItemState} from './menu-item';

export function useLinkState(props: MenuItemProps) {
  const {ref, focused} = useFocusable({
    focusKey: `menu@${props.name}`,
    onEnterPress: () => props.navigation.navigate(props.name as never),
  });

  const active = props.activeRoute.name === props.name;
  const state: MenuItemState = active ? 'Active' : focused ? 'Focused' : 'Default';

  return {
    ref,
    state,
    active,
    focused,
  };
}
