import type {Plugin} from 'vite';

import patchMotion from './fix-motion-import.js';
import patchCalendar from './fix-calendar-import.js';

export default [
  patchMotion,
  patchCalendar,
] as Plugin[];
