import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useEffect, useState, useMemo} from 'react';
import {useLocation} from 'home/hooks/useLocation';
import {getCurrentWeather} from 'home/utils/weather';

import type {Weather} from 'home/utils/weather';

export function useWeather() {
  const {i18n} = useLingui();
  const location = useLocation();
  const [data, setData] = useState<Weather | null>(null);
  const [text, setText] = useState(t(i18n)`Loading...`);
  const {position, request, authorized} = location;

  // Update when location changes
  useEffect(() => {
    if (!authorized) {
      setText(t(i18n)`[allow location for weather]`);
      return;
    }
  
    if (!position) return;

    getCurrentWeather(position).then(weather => {
      setText(`${weather.apparentTemperature}°F ${weather.relativeHumidity2m}% H`);
      setData(weather);
    });
  }, [i18n, position, authorized]);

  // Return memoized values
  return useMemo(
    () => ({text, data, request, authorized}),
    [text, data, request, authorized],
  );
}
