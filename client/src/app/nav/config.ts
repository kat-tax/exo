import type {PathConfig} from '@react-navigation/native';
import type {ImageSourcePropType} from 'react-native';

export const links: Record<string, Array<keyof NavScreens>> = {
  tabs: [
    'HomeDashboard',
    'TasksListAll',
    'SettingsOverview',
  ],
  menuTop: [
    'HomeDashboard',
    'TasksListAll',
  ],
  menuDevMenu: [
    'DevDesign',
    'DevCharts',
  ],
  menuFooterIcons: [
    'SettingsOverview',
  ],
} as const;

export type RootStackParamList = {
  HomeDashboard: undefined;
  HomeShortcut: {id: string};
  HomeNotFound: undefined;
  TasksListAll: undefined;
  TasksListDetails: {id: string};
  TasksListEdit: {id: string};
  SettingsOverview: undefined;
  DevDesign: undefined;
  DevCharts: undefined;
};

export type RootTabsParamList = {
  HomeDashboard: undefined;
  TasksListAll: undefined;
  SettingsOverview: undefined;
};

export type NavScreens = Record<
  keyof RootStackParamList,
  Omit<NavScreenConfig, 'name'>
>;

export type NavScreenConfig = {
  if?: () => boolean,
  name: keyof RootStackParamList,
  linking?: string | PathConfig<RootStackParamList | RootTabsParamList>,
  options?: {
    title: string,
    icon?: string,
    tabBarIcon?: () => ImageSourcePropType,
  },
}
