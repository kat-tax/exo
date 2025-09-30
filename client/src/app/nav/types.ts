import type {NavigationHelpers, NavigationRoute, PathConfig} from '@react-navigation/native';
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
  if?: () => boolean | undefined,
  name: keyof RootStackParamList,
  linking?: string | PathConfig<RootStackParamList | RootTabsParamList>,
  options?: {
    title: string,
    icon?: string,
    tabBarIcon?: () => ImageSourcePropType,
  },
}

export interface MenuItemProps extends Omit<MenuItemData, 'path' | 'tabBarIcon'>, React.PropsWithChildren {
  activeRoute: NavigationRoute<RootStackParamList, keyof RootStackParamList>
  navigation: NavigationHelpers<RootStackParamList, {}>,
}
