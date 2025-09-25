import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import type {MenuLinkProps, MenuLinkState} from './menu-link';

export function useLinkState(props: MenuLinkProps) {
  const {ref, focused} = useFocusable({
    focusKey: `menu@${props.path}`,
    onEnterPress: () => props.navigation.navigate(props.path as never),
  });

  const active = props.activeRoute.name === props.path;
  const state: MenuLinkState = active ? 'Active' : focused ? 'Focused' : 'Default';

  return {
    ref,
    state,
  };
}
