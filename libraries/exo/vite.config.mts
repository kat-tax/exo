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
      formats: ['cjs', 'es'],
      entry: {
        // Entry
        index: 'src/index.ts',
        // Assets
        'icon': 'src/assets/icon',
        'image': 'src/assets/image',
        'lottie': 'src/assets/lottie',
        'rive': 'src/assets/rive',
        'video': 'src/assets/video',
        // Hooks
        'variants': 'src/hooks/useVariants',
        // Services
        'device': 'src/services/device',
        'navigation': 'src/services/navigation',
        'storage': 'src/services/storage',
        // Interactions
        'form': 'src/utilities/form',
        'motion': 'src/utilities/motion',
        'gesture': 'src/utilities/gesture',
        // Widgets
        'checkbox': 'src/widgets/checkbox',
        'switch': 'src/widgets/switch',
        'radio': 'src/widgets/radio',
        'slider': 'src/widgets/slider',
        'progress': 'src/widgets/progress',
        'calendar': 'src/widgets/calendar',
      }
    },
    rollupOptions: {
      plugins,
      output: {
        dir: '.',
        chunkFileNames: 'chunks/[format]/[name]_[hash].js',
        //assetFileNames: (asset) => (asset.name === 'index.css')
        // ? 'video.css'
        // : `[name].[ext]`
      },
      external: [
        // React
        'react',
        'react-dom',
        'react-native',
        'react-native-web',
        'react/jsx-runtime',
        // 3rd party
        '@marceloterreiro/flash-calendar',
        '@react-native-community/viewpager',
        '@react-native-community/checkbox',
        '@react-native-community/slider',

      ],
    },
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    sourcemap: true,
    emptyOutDir: false,
  },
  ...vite,
});
