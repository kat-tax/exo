import type {Plugin} from 'vite';

import patchMotion from './fix-motion-import.js';
import patchCalendar from './fix-calendar-import.js';
import dynamicImportVar from '@rollup/plugin-dynamic-import-vars';

export default [
  patchMotion,
  patchCalendar,
  dynamicImportVar,
] as Plugin[];
