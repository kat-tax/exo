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
  const put = useDispatch();
  const set = (scheme: ColorSchemeName) => put(app.actions.setScheme(scheme));
  return (stored || storedOnly)
    ? [stored, set]
    : [value, set];
}
