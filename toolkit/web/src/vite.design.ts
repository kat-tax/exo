import {defineConfig, mergeConfig} from 'vite';
import baseConfig from './vite.base.js';
import plugins from './plugins/design/index.js';

export default defineConfig(env => mergeConfig(
  baseConfig(env),
  defineConfig({
    plugins,
    build: {
      outDir: './gen',
      cssMinify: 'lightningcss',
      cssCodeSplit: true,
      sourcemap: true,
      lib: {
        formats: ['es', 'cjs'],
        entry: {
          index: 'index.ts',
          theme: 'theme.ts',
          styles: 'styles.ts',
        }
      },
      rollupOptions: {
        external: [
          /* React */
          'react',
          'react-dom',
          'react-native',
          'react-native-web',
          'react/jsx-runtime',
          /* I18n */
          '@linguijs/core',
          '@linguijs/react',
          '@linguijs/macro',
        ],
        output: {
          chunkFileNames: 'chunks/[format]/[hash]/[name].js',
        },
      },
    },
  }),
));

