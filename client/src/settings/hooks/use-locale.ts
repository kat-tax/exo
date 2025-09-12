import {useRef} from 'react';
import {getLocale} from 'react-exo/device';
import {useSet, useGet} from 'app/data';
import settings from 'settings/store';

import type {Locales} from 'config/locales';

export function useLocale(storedOnly?: boolean): [
  Locales | undefined,
  (locale: Locales) => void,
] {
  const stored = useGet(settings.selectors.getLocale);
  const value = useRef(getLocale() as Locales);
  const set = useSet();
  const $ = (locale: Locales) => set(settings.actions.setLocale(locale));
  return (stored || storedOnly)
    ? [stored || (storedOnly ? undefined : 'en'), $]
    : [value?.current || 'en', $];
}
