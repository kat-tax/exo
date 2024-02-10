import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import pkg from './package.json';

import types from 'vite-plugin-dts';
import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    types(),
    paths(),
    react(),
  ],
  build: {
    lib: {
      fileName: 'index',
      formats: ['es', 'cjs'],
      entry: resolve(__dirname, pkg.source),
    },
    rollupOptions: {
      input: resolve(__dirname, pkg.source),
      external: ['react', 'react-dom', 'react-native', 'react-native-web'],
    }
  },
  resolve: {
    alias: {'react-native': 'react-native-web'},
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.mjs', '.mts', '.ts', '.tsx', '.js', '.jsx', '.json'],
  },
});
