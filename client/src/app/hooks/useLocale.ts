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

  const dispatch = useDispatch();
  const setter = (newLocale: Locales) =>
    dispatch(app.actions.setLocale(newLocale));

  return (stored || storedOnly)
    ? [stored || (storedOnly ? undefined : 'en'), setter]
    : [value?.current || 'en', setter];
}
