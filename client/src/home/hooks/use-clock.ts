import {useEffect, useState} from 'react';
import {useLocale} from 'app/hooks/use-locale';
import {getTime} from 'home/utils/time';

export function useClock(timeFormat: 'short' | 'medium' | 'long' = 'short') {
  const [locale] = useLocale();
  const [clock, setClock] = useState(getTime(locale, timeFormat));

  useEffect(() => {
    const i = setInterval(
      () => setClock(getTime(locale, timeFormat)),
      timeFormat === 'short' ? 60 * 1000 : 1000,
    );
    return () => clearInterval(i);
  }, [locale, timeFormat]);

  return clock;
}
