import {useSelector, useDispatch} from 'react-redux';
import {useColorScheme} from 'react-native';
import app from 'app/store';

import type {ColorSchemeName} from 'react-native';

export function useTheme(storedOnly?: boolean): [
  ColorSchemeName,
  (scheme: ColorSchemeName) => void,
] {
  const stored = useSelector(app.selectors.getScheme);
  const value = useColorScheme();
  const put = useDispatch();
  const set = (scheme: ColorSchemeName) => put(app.actions.setScheme(scheme));
  return (stored || storedOnly)
    ? [stored, set]
    : [value, set];
}
