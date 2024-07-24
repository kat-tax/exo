import {defineConfig, mergeConfig} from 'vite';
import webConfig from '../vite.web.js';

import cfg from 'config';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import {visualizer} from 'rollup-plugin-visualizer';
import {lingui} from '@lingui/vite-plugin';

export default defineConfig(env => mergeConfig(
  webConfig(env),
  defineConfig({
    build: {
      outDir: '../output/client/web',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          format: 'es',
          chunkFileNames: '[name]-[hash].js',
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
          for (const [key, value] of Object.entries(cfg)) {
            out = out.replace(new RegExp(`__${key}__`, 'g'), value);
          }
          return out;
        },
      },
      visualizer(),
    ],
    optimizeDeps: {
      exclude: [
        '@evolu/common-web',
      ],
    },
    worker: {
      format: 'es',
    }
  }),
));
