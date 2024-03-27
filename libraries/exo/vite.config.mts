import {defineConfig} from 'vite';
import plugins from './plugins';
import react from '@vitejs/plugin-react';
import paths from 'vite-tsconfig-paths';
import types from 'vite-plugin-dts';
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
      formats: ['es', 'cjs'],
      entry: {
        /* Entry */
        index: 'src/index.ts',
        /* Assets */
        icon: 'src/assets/icon',
        image: 'src/assets/image',
        video: 'src/assets/video',
        lottie: 'src/assets/lottie',
        rive: 'src/assets/rive',
        /* Services */
        navigation: 'src/services/navigation',
        storage: 'src/services/storage',
        device: 'src/services/device',
        form: 'src/services/form',
        /* Interactions */
        gesture: 'src/interactions/gesture',
        motion: 'src/interactions/motion',
        /* Widgets */
        calendar: 'src/widgets/calendar',
        progress: 'src/widgets/progress',
        slider: 'src/widgets/slider',
        radio: 'src/widgets/radio',
        switch: 'src/widgets/switch',
        checkbox: 'src/widgets/checkbox',
        /* Hooks */
        variants: 'src/hooks/useVariants',
      }
    },
    rollupOptions: {
      plugins,
      output: {
        chunkFileNames: 'chunks/[format]/[name]_[hash].js',
        // assetFileNames: (asset) => (asset.name === 'index.css')
        //   ? 'video.css'
        //   : `[name].[ext]`
      },
      external: [
        /* React */
        'react',
        'react-dom',
        'react-native',
        'react-native-web',
        'react/jsx-runtime',
        /* Native */
        '@marceloterreiro/flash-calendar',
      ],
    },
    outDir: 'dist',
    emptyOutDir: false,
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    sourcemap: true,
  },
  ...vite,
});
