import {useColorScheme} from 'react-native';
import {useSet, useGet} from 'app/data';
import app from 'app/store';

import type {ColorSchemeName} from 'react-native';

export function useTheme(storedOnly?: boolean): [
  ColorSchemeName,
  (scheme: ColorSchemeName) => void,
] {
  const stored = useGet(app.selectors.getScheme);
  const value = useColorScheme();
  const set = useSet();
  const $ = (scheme: ColorSchemeName) => set(app.actions.setScheme(scheme));
  return (stored || storedOnly)
    ? [stored, $]
    : [value, $];
}
