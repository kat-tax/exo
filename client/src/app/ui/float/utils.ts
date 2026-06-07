import type {GestureResponderEvent} from 'react-native';

export const isZeego = (event?: GestureResponderEvent) => {
  // @ts-expect-error Workaround for Zeego clicking the trigger component
  if (event?.target?.className === 'ContextMenuItemTitle') return true;
}
