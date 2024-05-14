import {defineConfig, mergeConfig} from 'vite';
import webConfig from '../vite.web.js';

import react from '@vitejs/plugin-react';
import types from 'vite-plugin-dts';
import dynImportVar from '@rollup/plugin-dynamic-import-vars';
import patchCalendar from '../mod/fix-calendar-import.js';
import patchMotion from '../mod/fix-motion-import.js';

export default defineConfig(env => mergeConfig(
  webConfig(env),
  defineConfig({
    build: {
      outDir: './gen/web',
      cssMinify: 'lightningcss',
      cssCodeSplit: true,
      sourcemap: true,
      lib: {
        formats: ['es'],
        entry: {
          /* Entry */
          index: 'src/index.ts',
          /* Assets */
          icon: 'src/assets/icon/Icon.export',
          image: 'src/assets/image/Image.export',
          video: 'src/assets/video/Video.export',
          lottie: 'src/assets/lottie/Lottie.export',
          rive: 'src/assets/rive/Rive.export',
          /* Layout */
          gesture: 'src/layout/gesture/Gesture.export',
          motion: 'src/layout/motion/Motion.export',
          navigation: 'src/layout/navigation/Navigation.export',
          safearea: 'src/layout/safe-area/SafeArea.export',
          skeleton: 'src/layout/skeleton/Skeleton.export',
          /* Services */
          device: 'src/services/device/Device.export',
          form: 'src/services/form/Form.export',
          i18n: 'src/services/i18n/I18n.export',
          redux: 'src/services/redux/Redux.export',
          storage: 'src/services/storage/Storage.export',
          toast: 'src/services/toast/Toast.export',
          /* Widgets */
          calendar: 'src/widgets/calendar/Calendar.export',
          checkbox: 'src/widgets/checkbox/Checkbox.export',
          picker: 'src/widgets/picker/Picker.export',
          progress: 'src/widgets/progress/Progress.export',
          radio: 'src/widgets/radio/Radio.export',
          slider: 'src/widgets/slider/Slider.export',
          switch: 'src/widgets/switch/Switch.export',
          /* Hooks */
          variants: 'src/hooks/useVariants'
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'chunks/[hash]/[name].js'
        },
        external: [
          /* Node */
          'fs',
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
          /* Vendor */
          '@vidstack/react',
        ],
      },
    },
    optimizeDeps: {
      exclude: [
        '@vidstack/react',
      ],
    },
    plugins: [
      dynImportVar as any,
      patchCalendar,
      patchMotion,
      types({
        exclude: ['gen', 'vite.config.mts'],
        outDir: './gen/types',
        insertTypesEntry: true,
      }),
      react(),
    ],
  }),
));

