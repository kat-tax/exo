/// <reference types="vite"/>

import {defineConfig} from 'vite';
import {lingui} from '@lingui/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import paths from 'vite-tsconfig-paths';
import million from 'million/compiler';
import vite from 'cfg/web/vite';

export default defineConfig({
  plugins: [
    lingui(),
    paths(),
    react({
      plugins: [
        ['@lingui/swc-plugin', {}],
      ],
    }),
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
