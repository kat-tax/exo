import {msg} from '@lingui/macro';

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

export function getCurrentTime() {
  return new Date().toLocaleTimeString();
}
