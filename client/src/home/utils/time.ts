import type {Locales} from 'config/locales';
import {msg} from '@lingui/core/macro';

export function getTime(
  language?: Locales,
  timeStyle: 'short' | 'medium' | 'long' = 'medium',
) {
  return new Date().toLocaleTimeString(language, {timeStyle});
}

export function greetMsg(name: string) {
  const hour = new Date().getHours();
  if (hour >= 4 && hour <= 11)
    return msg`Good morning, ${name}.`;
  if (hour >= 12 && hour <= 16)
    return msg`Good afternoon, ${name}.`;
  if (hour >= 17 && hour <= 20)
    return msg`Good evening, ${name}.`;
  if (hour >= 21 || hour <= 3)
    return msg`Good night, ${name}.`;
  return msg`Welcome back, ${name}.`;
}
