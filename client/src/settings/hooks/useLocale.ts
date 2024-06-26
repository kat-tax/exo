import {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {I18n} from 'react-exo/i18n';
import settings from 'settings/store';

import type {Locales} from 'config/locales';

export type LocaleData = [
  Locales | undefined,
  (locale: Locales) => void,
];

export function useLocale(storedOnly?: boolean): LocaleData {
  const dispatch = useDispatch();
  const stored = useSelector(settings.selectors.getLocale);
  const locale = useRef(I18n.getLocale() as Locales);

  const setLocale = (newLocale: Locales) =>
    dispatch(settings.actions.setLocale(newLocale));

  return (stored || storedOnly)
    ? [stored || (storedOnly ? undefined : 'en'), setLocale]
    : [locale?.current || 'en', setLocale];
}
