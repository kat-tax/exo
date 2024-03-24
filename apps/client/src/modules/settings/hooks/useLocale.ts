import {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getLanguage} from 'modules/settings/store/selectors';
import settings from 'modules/settings/store';
import device from 'react-exo/device';

import type {Locales} from 'common/i18n/types';

export function useLocale(storedOnly?: boolean) {
  const locale = useRef(device.getLocale(true) as Locales);
  const stored = useSelector(getLanguage);
  const dispatch = useDispatch();

  const setLocale = (newLocale: Locales) =>
    dispatch(settings.actions.setLocale(newLocale));

  return (stored || storedOnly)
    ? [stored, setLocale]
    : [locale.current || 'en', setLocale];
}
