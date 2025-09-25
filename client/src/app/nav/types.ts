import type {NavigationHelpers, NavigationRoute} from '@react-navigation/native';
import type {ImageSourcePropType} from 'react-native';

export type RootStackParamList = {
  HomeDashboard: undefined;
  HomeShortcut: {id: string};
  TasksListAll: undefined;
  TasksListDetails: {id: string};
  TasksListEdit: {id: string};
  DevDesign: undefined;
  DevCharts: undefined;
  Settings: undefined;
  NotFound: undefined;
};

export type RootTabsParamList = {
  HomeDashboard: undefined;
  TasksListAll: undefined;
  Settings: undefined;
};

export type MenuItemList = Record<
  keyof RootStackParamList,
  Omit<MenuItemData, 'name'>
>;

export type MenuItemData = {
  name: keyof RootStackParamList,
  label: string,
  path?: string,
  icon?: string,
  /** @deprecated This will be removed once react-exo/icons can generate pngs */
  iconNative?: () => ImageSourcePropType,
}

export interface MenuItemProps extends Omit<MenuItemData, 'path' | 'iconNative'>, React.PropsWithChildren {
  activeRoute: NavigationRoute<RootStackParamList, keyof RootStackParamList>
  navigation: NavigationHelpers<RootStackParamList, {}>,
}
