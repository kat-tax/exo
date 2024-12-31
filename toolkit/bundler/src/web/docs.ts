import {defineConfig, mergeConfig} from 'vite';
import webConfig from '../vite.web.js';
import react from '@vitejs/plugin-react';

export default defineConfig(env => mergeConfig(
  webConfig(env),
  defineConfig({
    build: {
      outDir: '../output/docs',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      target: [
        'esnext',
        'safari15',
        'chrome128',
        'firefox128',
        'edge128',
      ],
    },
    plugins: [
      react({
        babel: {
          plugins: ['@lingui/babel-plugin-lingui-macro'],
        },
      }),
    ],
    resolve: {
      alias: {
        'react-native': 'react-native-web',
      },
    },
    optimizeDeps: {
      include: [
        'react-native-ultimate-config/index.web.js',
        'react-native-unistyles',
        'react-native-web',
        'design',
      ],
    },
  }),
));
