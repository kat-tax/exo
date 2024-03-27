import {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Device} from 'react-exo/device';
import {getLocale} from 'mod/settings/store/selectors';
import settings from 'mod/settings/store';

import type {Locales} from 'lib/i18n/types';

export function useLocale(storedOnly?: boolean): [Locales, (locale: Locales) => void] {
  const locale = useRef(Device.getLocale(true) as Locales);
  const stored = useSelector(getLocale);
  const dispatch = useDispatch();

  const setLocale = (newLocale: Locales) =>
    dispatch(settings.actions.setLocale(newLocale));

  return (stored || storedOnly)
    ? [stored || 'en', setLocale]
    : [locale?.current || 'en', setLocale];
}
