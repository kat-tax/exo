import {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useColorScheme} from 'react-native';
import {getLocale} from 'react-exo/device';
import app from 'app/store';

import type {Locales} from 'config/locales';
import type {ColorSchemeName} from 'react-native';

export type Display = {
  theme: [ColorSchemeName, (scheme: ColorSchemeName) => void],
  locale: [Locales | undefined, (locale: Locales) => void],
}

export function useTheme(storedOnly?: boolean): Display['theme'] {
  const stored = useSelector(app.selectors.getScheme);
  const value = useColorScheme();
  const put = useDispatch();
  const set = (scheme: ColorSchemeName) => put(app.actions.setScheme(scheme));
  return (stored || storedOnly)
    ? [stored, set]
    : [value, set];
}

export function useLocale(storedOnly?: boolean): Display['locale'] {
  const stored = useSelector(app.selectors.getLocale);
  const value = useRef(getLocale() as Locales);
  const put = useDispatch();
  const set = (locale: Locales) =>
    put(app.actions.setLocale(locale));
  return (stored || storedOnly)
    ? [stored || (storedOnly ? undefined : 'en'), set]
    : [value?.current || 'en', set];
}
