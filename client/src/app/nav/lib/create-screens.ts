import {Screen} from './screens';
import type {NavScreens, RootStackParamList} from 'app/nav';

export const createScreens = (
  screens: NavScreens,
  keys: (keyof RootStackParamList)[],
) => (
  keys.reduce((acc, key) => {
    acc[key] = {
      ...screens[key],
      screen: Screen[key],
    };
    return acc;
  }, {} as Record<keyof RootStackParamList, any>)
);
