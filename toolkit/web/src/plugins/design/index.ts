import type {Plugin} from 'vite';

import types from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import {lingui} from '@lingui/vite-plugin';
import basePlugins from '../base/index.js';

export default <Plugin[]> [
  ...basePlugins,
  lingui(),
  types({
    exclude: ['gen', 'lingui.config.ts', 'vite.config.ts'],
    insertTypesEntry: true,
  }),
  react({
    babel: {
      plugins: ['macros'],
    },
  }),
  million.vite({
    auto: true,
    telemetry: false,
  }),
]
