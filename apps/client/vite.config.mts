/// <reference types="vite"/>

import {defineConfig} from 'vite';
import million from 'million/compiler';
import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import vite from 'cfg/web/vite.config';

export default defineConfig({
  plugins: [
    paths(),
    react(),
    million.vite({
      auto: true,
      telemetry: false,
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
  ...vite,
});
