/// <reference types="vite"/>

import {defineConfig} from 'vite';
import {lingui} from '@lingui/vite-plugin';
import million from 'million/compiler';
import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import vite from 'cfg/web/vite';

export default defineConfig({
  plugins: [
    lingui(),
    paths(),
    react(),
    million.vite({
      auto: true,
      telemetry: false,
    }),
  ],
  build: {
    outDir: '../../dist/web',
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
