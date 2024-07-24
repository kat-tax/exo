import {msg} from '@lingui/macro';
import type {Locales} from 'config/locales';

export function getDayGreeting() {
  switch (getTimeOfDay()) {
    case 'morning':
      return msg`Good morning`;
    case 'afternoon':
      return msg`Good afternoon`;
    case 'evening':
      return msg`Good evening`;
    case 'night':
      return msg`Enjoy the night`;
    default:
      return msg`Enjoy the day`;
  }
}

export function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour <= 11)
    return 'morning';
  if (hour >= 12 && hour <= 16)
    return 'afternoon';
  if (hour >= 17 && hour <= 20)
    return 'evening';
  if (hour >= 21 || hour <= 3)
    return 'night';
  return 'unknown';
}

export function getCurrentTime(
  language?: Locales,
  timeStyle: 'short' | 'medium' | 'long' = 'medium',
) {
  return new Date().toLocaleTimeString(language, {timeStyle});
}

export function getCurrentDate() {
  return new Date().toLocaleDateString();
}

export function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  });
}
