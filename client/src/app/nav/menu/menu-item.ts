import type {NavigationHelpers, NavigationRoute} from '@react-navigation/native';
import type {RootStackParamList} from 'app/nav/types';

export const MenuItemVariants = {
  state: ['Default', 'Active', 'Focused'],
} as const;

export type MenuItemState = typeof MenuItemVariants['state'][number];

export type MenuItemData = {
  label: string,
  name: keyof RootStackParamList,
  icon?: React.ReactElement,
}

export type MenuItemList = Record<
  keyof RootStackParamList,
  Omit<MenuItemData, 'name'>
>;

export interface MenuItemProps extends MenuItemData, React.PropsWithChildren {
  activeRoute: NavigationRoute<RootStackParamList, keyof RootStackParamList>
  navigation: NavigationHelpers<RootStackParamList, {}>,
}
