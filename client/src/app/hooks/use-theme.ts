import {useColorScheme} from 'react-native';
import {usePut, useGet} from 'app/data/store';
import app from 'app/store';

import type {ColorSchemeName} from 'react-native';

export function useTheme(storedOnly?: boolean): [
  ColorSchemeName,
  (scheme: ColorSchemeName) => void,
] {
  const stored = useGet(app.selectors.getScheme);
  const value = useColorScheme();
  const put = usePut();
  const set = (scheme: ColorSchemeName) =>
    put(app.actions.setScheme(scheme));
  return (stored || storedOnly)
    ? [stored, set]
    : [value, set];
}
