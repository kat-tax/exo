import {defineConfig, mergeConfig} from 'vite';
import webConfig from '../vite.web.js';

import cfg from 'config';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import {visualizer} from 'rollup-plugin-visualizer';
import {lingui} from '@lingui/vite-plugin';

export default defineConfig(env => mergeConfig(
  webConfig(env),
  defineConfig({
    build: {
      outDir: '../output/client/web',
      emptyOutDir: true,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          format: 'es',
          manualChunks: getChunkName,
        }
      }
    },
    preview: {
      open: false,
    },
    plugins: [
      lingui(),
      react({
        babel: {
          plugins: ['macros'],
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
          Object.entries(cfg).map(([key, value]) =>
            [new RegExp(`__${key}__`, 'g'), value]).forEach(([reg, val]) => {
              out = out.replace(reg as any, val as any);
            });
          return out;
        },
      },
      visualizer(),
    ],
    optimizeDeps: {
      exclude: ['@evolu/common-web'],
    },
    worker: {
      format: 'es',
    }
  }),
));

function getChunkName(path: string) {
  const ns = '/node_modules/';
  return path.includes(ns)
  ? (path.includes(ns + '@effect/')
    || path.includes(ns + 'effect/')
    || path.includes(ns + 'flatbuffers/')
    || path.includes(ns + 'kysely/')
    || path.includes(ns + '@scure/')
    || path.includes(ns + '@noble/')
    || path.includes(ns + '@evolu/')
    || path.includes(ns + '@protobuf-ts/'))
    ? 'data'
    : (path.includes(ns + '@ai-sdk/')
      || path.includes(ns + 'ai/')
      || path.includes(ns + 'zod/')
      || path.includes(ns + 'zod-to-json-schema/')
      || path.includes(ns + 'secure-json-parse/')
      || path.includes(ns + 'vite-plugin-node-polyfills/'))
      ? 'ai'
      : 'vendor'
  : null
}
