import {t} from '@lingui/macro';
import {timeOfDay} from 'common/utils/date';

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
