import {useSelector, useDispatch} from 'react-redux';
import {useColorScheme} from 'react-native';
import app from 'app/store';

import type {ColorSchemeName} from 'react-native';

export type SchemeData = [
  ColorSchemeName,
  (scheme: ColorSchemeName) => void,
]

export function useScheme(storedOnly?: boolean): SchemeData {
  const stored = useSelector(app.selectors.getScheme);
  const value = useColorScheme();
  const dispatch = useDispatch();
  const setter = (newScheme: ColorSchemeName) =>
    dispatch(app.actions.setScheme(newScheme));

  return (stored || storedOnly)
    ? [stored, setter]
    : [value, setter];
}
