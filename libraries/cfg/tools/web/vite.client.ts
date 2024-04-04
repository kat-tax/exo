import {defineConfig, mergeConfig} from 'vite';
import baseConfig from './vite.base.js';
import react from '@vitejs/plugin-react';
import {lingui} from '@lingui/vite-plugin';

export default defineConfig(env => mergeConfig(
  baseConfig(env),
  defineConfig({
    plugins: [
      lingui(),
      react({
        babel: {
          plugins: ['macros'],
        },
      }),
    ],
    build: {
      outDir: 'dist/web',
      rollupOptions: {
        output: {
          manualChunks: i => i.includes('node_modules')
            ? 'vendor'
            : null,
        }
      }
    },
    define: {
      ...env.command === 'serve' && {
        process: {
          env: {
            DEV: JSON.stringify('true'),
            NODE_ENV: JSON.stringify('development'),
          },
        },
      },
    },
  }),
));
