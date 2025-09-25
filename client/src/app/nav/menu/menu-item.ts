import type {NavigationHelpers, NavigationRoute} from '@react-navigation/native';
import type {RootStackParamList} from 'app/nav/types';

export const MenuItemVariants = {
  state: ['Default', 'Active', 'Focused'],
} as const;

export type MenuItemState = typeof MenuItemVariants['state'][number];

export type MenuItemData = {
  label: string,
  icon: React.ReactElement,
  path: keyof RootStackParamList,
}

export type MenuItemList = Record<keyof RootStackParamList, MenuItemData>;

export interface MenuItemProps extends MenuItemData, React.PropsWithChildren {
  activeRoute: NavigationRoute<RootStackParamList, keyof RootStackParamList>
  navigation: NavigationHelpers<RootStackParamList, {}>,
}
