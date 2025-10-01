import {Screen} from './screens';
import type {NavScreens, RootStackParamList} from 'app/nav';

type ScreenKey = keyof RootStackParamList;

export const createScreens = (
  screens: NavScreens,
  keys?: ScreenKey[],
) => (
  (keys ?? Object.keys(screens) as ScreenKey[]).reduce((acc, key) => {
    acc[key] = {
      ...screens[key],
      screen: Screen[key],
    };
    return acc;
  }, {} as Record<ScreenKey, any>)
);
