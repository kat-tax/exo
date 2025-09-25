import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import type {MenuItemProps} from 'app/nav/types';

export function useLinkState(props: MenuItemProps) {
  const active = props.activeRoute.name === props.name;
  const {ref, focused} = useFocusable({
    focusKey: `menu@${props.name}`,
    onEnterPress: () => props.navigation.navigate(props.name as never),
  });

  return {
    ref,
    active,
    focused,
  };
}
