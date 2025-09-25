import type {NavigationHelpers, NavigationRoute} from '@react-navigation/native';
import type {RootStackParamList} from 'app/nav/types';

export const MenuLinkVariants = {
  state: ['Default', 'Active', 'Focused'],
} as const;

export type MenuLinkState = typeof MenuLinkVariants['state'][number];
export type MenuLinkData = Record<
  keyof RootStackParamList,
  Omit<MenuLinkProps, 'activeRoute' | 'navigation'>
>;

export interface MenuLinkProps extends React.PropsWithChildren {
  activeRoute: NavigationRoute<RootStackParamList, keyof RootStackParamList>
  navigation: NavigationHelpers<RootStackParamList, {}>,
  label: string,
  path: keyof RootStackParamList,
  icon: React.ReactElement,
}
