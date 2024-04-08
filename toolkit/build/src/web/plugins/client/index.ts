import type {Plugin} from 'vite';

import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import {lingui} from '@lingui/vite-plugin';
//import htmlConfig from './html-config.js';
import basePlugins from '../base/index.js';

export default <Plugin[]> [
  ...basePlugins,
  //htmlConfig,
  lingui(),
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
