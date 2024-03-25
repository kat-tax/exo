import {defineConfig} from 'vite';

import types from 'vite-plugin-dts';
import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import vite from 'cfg/web/vite';

export default defineConfig({
  plugins: [
    paths(),
    react(),
    types({
      outDir: '.',
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      formats: ['cjs', 'es'],
      entry: {
        /* Assets */
        'icon': 'src/assets/icon',
        'image': 'src/assets/image',
        'lottie': 'src/assets/lottie',
        'rive': 'src/assets/rive',
        'video': 'src/assets/video',
        /* Hooks */
        'variants': 'src/hooks/useVariants',
        /** Services */
        'device': 'src/services/device',
        'navigation': 'src/services/navigation',
        'storage': 'src/services/storage',
        /** Utilities */
        'form': 'src/utilities/form',
        'gesture': 'src/utilities/gesture',
        'motion': 'src/utilities/motion',
        /* Widgets */
        'calendar': 'src/widgets/calendar',
        'checkbox': 'src/widgets/checkbox',
        'progress': 'src/widgets/progress',
        'radio': 'src/widgets/radio',
        'slider': 'src/widgets/slider',
        'switch': 'src/widgets/switch',
      }
    },
    rollupOptions: {
      output: {
        dir: '.',
        chunkFileNames: 'chunks/[format]/[name]_[hash].js',
        assetFileNames: (asset) => (asset.name === 'index.css')
          ? 'video.css'
          : `[name].[ext]`
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
    emptyOutDir: false,
    cssCodeSplit: true,
    sourcemap: true,
  },
  ...vite,
});
