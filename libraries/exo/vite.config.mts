import {defineConfig} from 'vite';

import types from 'vite-plugin-dts';
import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import vite from 'cfg/web/vite.config';

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
        /* Utilities */
        'variants': 'src/hooks/useVariants',
        /* Assets */
        'icon': 'src/components/asset/icon',
        'image': 'src/components/asset/image',
        'video': 'src/components/asset/video',
        'lottie': 'src/components/asset/lottie',
        'rive': 'src/components/asset/rive',
        /* Interface */
        'checkbox': 'src/components/interface/checkbox',
        'switch': 'src/components/interface/switch',
        'radio': 'src/components/interface/radio',
        'slider': 'src/components/interface/slider',
        'progress': 'src/components/interface/progress',
        'calendar': 'src/components/interface/calendar',
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
