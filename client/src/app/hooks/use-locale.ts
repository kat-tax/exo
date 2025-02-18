import {useRef} from 'react';
import {getLocale} from 'react-exo/device';
import {usePut, useGet} from 'app/data/store';
import app from 'app/store';

import type {Locales} from 'config/locales';

export function useLocale(storedOnly?: boolean): [
  Locales | undefined,
  (locale: Locales) => void,
] {
  const stored = useGet(app.selectors.getLocale);
  const value = useRef(getLocale() as Locales);
  const put = usePut();
  const set = (locale: Locales) =>
    put(app.actions.setLocale(locale));
  return (stored || storedOnly)
    ? [stored || (storedOnly ? undefined : 'en'), set]
    : [value?.current || 'en', set];
}
