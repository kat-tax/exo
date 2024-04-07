import {defineConfig, mergeConfig} from 'vite';
import baseConfig from './vite.base.js';
import plugins from './plugins/lib/index.js';

export default defineConfig(env => mergeConfig(
  baseConfig(env),
  defineConfig({
    plugins,
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
