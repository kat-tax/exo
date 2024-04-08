import {defineConfig, mergeConfig} from 'vite';
import baseConfig from './vite.base.js';
import plugins from './plugins/client/index.js';

export default defineConfig(env => mergeConfig(
  baseConfig(env),
  defineConfig({
    plugins,
    build: {
      outDir: '../output/client/web',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: i => i.includes('node_modules')
            ? 'vendor'
            : null,
        }
      }
    },
    optimizeDeps: {
      include: ['config']
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
