import {useEffect, useState} from 'react';
import {getCurrentTime} from 'home/utils/time';
import {useLocale} from 'settings/hooks/useLocale';

export function useClock(timeFormat: 'short' | 'medium' | 'long' = 'short') {
  const [locale] = useLocale();
  const [clock, setClock] = useState(getCurrentTime(locale, timeFormat));

  useEffect(() => {
    const i = setInterval(
      () => setClock(getCurrentTime(locale, timeFormat)),
      timeFormat === 'short' ? 60 * 1000 : 1000,
    );
    return () => clearInterval(i);
  }, [locale, timeFormat]);

  return clock;
}
