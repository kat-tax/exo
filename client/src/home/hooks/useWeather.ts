import {useEffect, useState} from 'react';
import {getCurrentWeather} from 'home/utils/weather';
import {useLocation} from 'home/hooks/useLocation';

import type {Weather} from 'home/utils/weather';

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [lat, lon] = useLocation();

  // Update when location changes
  useEffect(() => {
    if (!lat || !lon) return;
    (async () => {
      const current = await getCurrentWeather(lat, lon);
      setWeather(current);
    })();
  }, [lat, lon]);

  return weather
    ? `${weather.apparentTemperature}°F ${weather.relativeHumidity2m}% H`
    : 'Loading...';
}
