import type {Plugin} from 'vite';

import types from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import dynImportVar from '@rollup/plugin-dynamic-import-vars';
import patchCalendar from './fix-calendar-import.js';
import patchMotion from './fix-motion-import.js';
import basePlugins from '../base/index.js';

export default <Plugin[]> [
  ...basePlugins,
  dynImportVar,
  patchCalendar,
  patchMotion,
  types({
    exclude: ['gen', 'vite.config.mts'],
    insertTypesEntry: true,
  }),
  react(),
]
