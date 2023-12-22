/// <reference types="vite"/>

import {defineConfig} from 'vite';
import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  const isDev = mode === 'development';
  return {
    plugins: [
      paths(),
      react(),
    ],
    define: {
      __DEV__: isDev,
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
    build: {
      outDir: 'dist/web',
      rollupOptions: {
        output: {
          manualChunks: (i) => i.includes('node_modules')
            ? 'vendor'
            : null,
        }
      }
    },
  };
});
