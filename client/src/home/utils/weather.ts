import {fetchWeatherApi} from 'openmeteo';

export type Weather = {
  isDay: number,
  temperature2m: number,
  apparentTemperature: number,
  relativeHumidity2m: number,
  precipitation: number,
  rain: number,
  showers: number,
  snowfall: number,
  cloudCover: number,
  windGusts10m: number,
  windSpeed10m: number,
  windDirection10m: number,
  pressureMsl: number,
  surfacePressure: number,
  weatherCode: number,
}
  
export async function getCurrentWeather([lat, lon]: readonly [number, number]): Promise<Weather> {
  const params = {
    latitude: lat,
    longitude: lon,
    timezone: 'auto',
    wind_speed_unit: 'mph',
    temperature_unit: 'fahrenheit',
    precipitation_unit: 'inch',
    current: [
      'is_day',
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'precipitation',
      'rain',
      'showers',
      'snowfall',
      'cloud_cover',
      'wind_gusts_10m',
      'wind_speed_10m',
      'wind_direction_10m',
      'surface_pressure',
      'pressure_msl',
      'weather_code',
    ],
  };

  const url = 'https://api.open-meteo.com/v1/forecast';
  const res = await fetchWeatherApi(url, params);
  const cur = res[0].current();

  return {
    temperature2m: round(cur?.variables(0)?.value() ?? 0, 0),
    relativeHumidity2m: round(cur?.variables(1)?.value() ?? 0, 0),
    apparentTemperature: round(cur?.variables(2)?.value() ?? 0, 0),
    isDay: cur?.variables(3)?.value() ?? 0,
    precipitation: round(cur?.variables(4)?.value() ?? 0, 0),
    rain: round(cur?.variables(5)?.value() ?? 0, 0),
    showers: round(cur?.variables(6)?.value() ?? 0, 0),
    snowfall: round(cur?.variables(7)?.value() ?? 0, 0),
    weatherCode: cur?.variables(8)?.value() ?? 0,
    cloudCover: round(cur?.variables(9)?.value() ?? 0, 0),
    pressureMsl: round(cur?.variables(10)?.value() ?? 0, 0),
    surfacePressure: round(cur?.variables(11)?.value() ?? 0, 0),
    windSpeed10m: round(cur?.variables(12)?.value() ?? 0, 0),
    windDirection10m: round(cur?.variables(13)?.value() ?? 0, 0),
    windGusts10m: round(cur?.variables(14)?.value() ?? 0, 0),
  }
}

function round(num: number, decimals: number) {
  return Math.round(num * 10 ** decimals) / 10 ** decimals;
}
