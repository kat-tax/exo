import {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLocale} from 'react-exo/device';
import app from 'app/store';

import type {Locales} from 'config/locales';

export type LocaleData = [
  Locales | undefined,
  (locale: Locales) => void,
];

export function useLocale(storedOnly?: boolean): LocaleData {
  const stored = useSelector(app.selectors.getLocale);
  const value = useRef(getLocale() as Locales);
  const put = useDispatch();
  const set = (locale: Locales) => put(app.actions.setLocale(locale));
  return (stored || storedOnly)
    ? [stored || (storedOnly ? undefined : 'en'), set]
    : [value?.current || 'en', set];
}
