/// <reference types="vite"/>

import {defineConfig} from 'vite';
import {lingui} from '@lingui/vite-plugin';
import million from 'million/compiler';
import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig(config => {
  const isDev = config.mode === 'development';
  return {
    plugins: [
      paths(),
      lingui(),
      react({
        babel: {
          plugins: ["macros"],
        },
      }),
      million.vite({
        auto: true,
        telemetry: false,
      }),
    ],
    build: {
      outDir: '../../../dist/web',
      rollupOptions: {
        output: {
          manualChunks: i => i.includes('node_modules')
            ? 'vendor'
            : null,
        }
      }
    },
    resolve: {
      alias: {
        'react-native': 'react-native-web',
      },
      extensions: [
        '.web.tsx',
        '.web.ts',
        '.web.js',
        '.mjs',
        '.mts',
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
      ],
    },
    define: {
      global: 'window',
      __DEV__: isDev,
      ...isDev && {
        process: {
          env: {
            DEV: JSON.stringify('true'),
            NODE_ENV: JSON.stringify('development'),
          },
        },
      },
    },
  };
});