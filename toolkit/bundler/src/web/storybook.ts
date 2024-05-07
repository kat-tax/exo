import {defineConfig, mergeConfig} from 'vite';
import webConfig from '../vite.web.js';

import react from '@vitejs/plugin-react';
import {lingui} from '@lingui/vite-plugin';

export default defineConfig(env => mergeConfig(
  webConfig(env),
  defineConfig({
    plugins: [
      lingui(),
      react({
        babel: {
          plugins: ['macros'],
        },
      }),
    ],
  }),
));
