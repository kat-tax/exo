import {useColorScheme} from 'react-native';
import {useSet, useGet} from 'app/data';
import settings from 'settings/store';

import type {ColorSchemeName} from 'react-native';

export function useTheme(storedOnly?: boolean): [
  ColorSchemeName,
  (scheme: ColorSchemeName) => void,
] {
  const stored = useGet(settings.selectors.getScheme);
  const value = useColorScheme();
  const set = useSet();
  const $ = (scheme: ColorSchemeName) => set(settings.actions.setScheme(scheme));
  return (stored || storedOnly)
    ? [stored, $]
    : [value, $];
}
