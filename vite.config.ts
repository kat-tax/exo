/// <reference types="vite"/>

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsPaths from 'vite-tsconfig-paths';

export default defineConfig(({mode}) => {
  const isDev = mode === 'development';
  return {
    plugins: [
      tsPaths(),
      react(),
    ],
    resolve: {
      extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
      alias: {'react-native': 'react-native-web'},
    },
    build: {
      outDir: 'dist/web',
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks: (id) => id.includes('node_modules') ? 'vendor' : null,
        }
      }
    },
    define: {
      __DEV__: isDev,
      ...isDev && {
        global: 'window',
        process: {
          env: {
            NODE_ENV: '"development"',
          },
        },
      },
    },
  };
});
