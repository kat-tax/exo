import {useSelector, useDispatch} from 'react-redux';
import {useColorScheme} from 'react-native';
import settings from 'settings/store';

import type {ColorSchemeName} from 'react-native';

export type SchemeData = [
  ColorSchemeName,
  (scheme: ColorSchemeName) => void,
]

export function useScheme(storedOnly?: boolean): SchemeData {
  const dispatch = useDispatch();
  const stored = useSelector(settings.selectors.getScheme);
  const value = useColorScheme();
  const setter = (newScheme: ColorSchemeName) =>
    dispatch(settings.actions.setScheme(newScheme));

  return (stored || storedOnly)
    ? [stored, setter]
    : [value, setter];
}
