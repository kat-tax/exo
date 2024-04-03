import type {UserConfig} from 'vite';

import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import {lingui} from '@lingui/vite-plugin';

export default <UserConfig> {
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
    __DEV__: true,
    ...true && {
      process: {
        env: {
          DEV: JSON.stringify('true'),
          NODE_ENV: JSON.stringify('development'),
        },
      },
    },
  },
}