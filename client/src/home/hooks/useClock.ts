import {useEffect, useState} from 'react';
import {getCurrentTime} from 'home/utils/time';

export function useClock(timeFormat: 'short' | 'medium' | 'long' = 'short') {
  const [clock, setClock] = useState(getCurrentTime(timeFormat));
  useEffect(() => {
    const i = setInterval(() =>
      setClock(getCurrentTime(timeFormat)), 1000);
    return () => clearInterval(i);
  }, []);

  return clock;
}
