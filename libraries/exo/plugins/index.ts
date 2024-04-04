import type {Plugin} from 'vite';

import patchMotion from './fix-motion-import';
import patchCalendar from './fix-calendar-import';

export default [
  patchMotion,
  patchCalendar,
] as Plugin[];
