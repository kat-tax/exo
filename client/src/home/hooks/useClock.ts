import {useEffect, useState} from 'react';
import {getCurrentTime} from 'home/utils/time';
import {useLocale} from 'settings/hooks/useLocale';

export function useClock(timeFormat: 'short' | 'medium' | 'long' = 'short') {
  const [locale] = useLocale();
  const [clock, setClock] = useState(getCurrentTime(locale, timeFormat));

  // Update every second
  useEffect(() => {
    const i = setInterval(() =>
      setClock(getCurrentTime(locale, timeFormat)), 1000);
    return () => clearInterval(i);
  }, [locale, timeFormat]);

  return clock;
}
