import {defineConfig} from 'vite';

import types from 'vite-plugin-dts';
import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    types({insertTypesEntry: true}),
    paths(),
    react(),
  ],
  build: {
    lib: {
      formats: ['cjs', 'es'],
      entry: {
        /* Utilities */
        'variants': 'src/hooks/useVariants',
        /* Assets */
        'icon': 'src/components/asset/icon',
        'image': 'src/components/asset/image',
        'video': 'src/components/asset/video',
        'lottie': 'src/components/asset/lottie',
        'rive': 'src/components/asset/rive',
        /* Controller */
        'pointer': 'src/components/controller/pointer',
        /* Interface */
        'checkbox': 'src/components/interface/checkbox',
        'progress': 'src/components/interface/progress',
        'radio-button': 'src/components/interface/radio-button',
        'radio-group': 'src/components/interface/radio-group',
        'slider': 'src/components/interface/slider',
        'switch': 'src/components/interface/switch',
      }
    },
    rollupOptions: {
      output: {
        dir: 'dist',
        chunkFileNames: '_chunks/[format]/[name]_[hash].js',
        assetFileNames(chunkInfo) {
          return (chunkInfo.name === 'index.css')
            ? 'Video.css'
            : `[name].[ext]`;
        },
      },
      external: [
        'react',
        'react-dom',
        'react-native',
        'react-native-web',
        'react/jsx-runtime',
      ],
    },
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    sourcemap: true,
  },
});
