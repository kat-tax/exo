import {defineConfig, mergeConfig} from 'vite';
import webConfig from '../vite.web.js';

import cfg from 'config';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import {lingui} from '@lingui/vite-plugin';

export default defineConfig(env => mergeConfig(
  webConfig(env),
  defineConfig({
    build: {
      outDir: '../output/client/web',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: i => i.includes('node_modules')
            ? 'vendor'
            : null,
        }
      }
    },
    preview: {
      open: false,
    },
    plugins: [
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
      {
        name: 'index-html-config',
        transformIndexHtml(html) {
          let out = html;
          Object.entries(cfg).map(([key, value]) =>
            [new RegExp(`__${key}__`, 'g'), value]).forEach(([reg, val]) => {
              out = out.replace(reg as any, val as any);
            });
          return out;
        },
      }
    ],
  }),
));
