import {useEffect, useState} from 'react';
import {getCurrentTime} from 'home/utils/time';

export function useClock() {
  const timeFormat: 'short' | 'medium' | 'long' = 'short';
  const [clock, setClock] = useState(getCurrentTime(timeFormat));

  // Update every minute
  useEffect(() => {
    const i = setInterval(() =>
      setClock(getCurrentTime(timeFormat)), 1000);
    return () => clearInterval(i);
  }, []);

  return clock;
}
