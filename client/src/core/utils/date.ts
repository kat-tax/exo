import {t} from '@lingui/macro';

export function timeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour <= 11)
    return 'morning';
  if (hour >= 12 && hour <= 16)
    return 'afternoon';
  if (hour >= 17 && hour <= 20)
    return 'evening';
  if (hour >= 21 || hour <= 3)
    return 'night';
}

export function getGreeting() {
  switch (timeOfDay()) {
    case 'morning':
      return t`Good morning.`;
    case 'afternoon':
      return t`Good afternoon.`;
    case 'evening':
      return t`Good evening.`;
    case 'night':
      return t`Enjoy the night.`;
  }
}