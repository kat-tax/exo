import {defineConfig, mergeConfig} from 'vite';
import webConfig from '../vite.web.js';

import cfg from 'config';
import sonda from 'sonda/vite'; 
import million from 'million/compiler';
import react from '@vitejs/plugin-react';
import {lingui} from '@lingui/vite-plugin';

export default defineConfig(env => mergeConfig(
  webConfig(env),
  defineConfig({
    build: {
      outDir: '../output/client/web',
      sourcemap: true,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1500,
      target: [
        'esnext',
        'safari15',
        'chrome128',
        'firefox128',
        'edge128',
      ],
      rollupOptions: {
        output: {
          format: 'es',
          chunkFileNames: '[name]-[hash].js',
        },
        onwarn: (warning, warn) => {
          if (warning.code === 'EVAL') return;
          warn(warning);
        },
      },
    },
    preview: {
      open: false,
    },
    plugins: [
      lingui(),
      react({
        babel: {
          compact: false,
          plugins: [
            '@lingui/babel-plugin-lingui-macro',
          ],
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
            out = out.replace(new RegExp(`__${key}__`, 'g'), value as string);
          }
          return out;
        },
      },
      sonda({
        open: false,
        sources: false,
        detailed: false,
        filename: 'bundle.inspect.html',
      }),
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
