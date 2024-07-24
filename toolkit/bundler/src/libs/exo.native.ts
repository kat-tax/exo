import {defineConfig, mergeConfig} from 'vite';
import nativeConfig from '../vite.native.js';

import react from '@vitejs/plugin-react';

export default defineConfig(env => mergeConfig(
  nativeConfig(env),
  defineConfig({
    build: {
      outDir: './gen/native',
      sourcemap: false,
      minify: false,
      lib: {
        formats: ['cjs'],
        entry: {
          /* Assets */
          icon: 'src/assets/icon/Icon.export',
          image: 'src/assets/image/Image.export',
          video: 'src/assets/video/Video.export',
          lottie: 'src/assets/lottie/Lottie.export',
          rive: 'src/assets/rive/Rive.export',
          markdown: 'src/assets/markdown/Markdown.export',
          /* Layout */
          gesture: 'src/layout/gesture/Gesture.export',
          motion: 'src/layout/motion/Motion.export',
          navigation: 'src/layout/navigation/Navigation.export',
          skeleton: 'src/layout/skeleton/Skeleton.export',
          /* Services */
          device: 'src/services/device/Device.export',
          form: 'src/services/form/Form.export',
          fs: 'src/services/fs/Fs.export',
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
          /* Utils */
          utils: 'src/utilities/index.ts',
          /* Plugins */
          'babel-plugin-iconify-extract': 'src/assets/icon/babel-plugin/extract.ts',
          'babel-plugin-iconify-transform': 'src/assets/icon/babel-plugin/transform.ts',
        }
      },
      rollupOptions: {
        output: {
          entryFileNames: (info) => info.name.includes('babel-plugin-')
            ? '[name].cjs'
            : '[name].js',
          manualChunks: undefined,
        },
        external: [
          /* Node */
          'fs',
          'fs/promises',
          /* React */
          'react',
          'react-dom',
          'react-native',
          'react-native-unistyles',
          'react/jsx-runtime',
          /* I18n */
          '@linguijs/core',
          '@linguijs/react',
          '@linguijs/macro',
          /** Vendor */
          '@candlefinance/faster-image',
          '@marceloterreiro/flash-calendar',
          '@react-native-community/checkbox',
          '@react-native-community/netinfo',
          '@react-native-community/slider',
          '@react-native-picker/picker',
          'react-native-gesture-handler',
          'react-native-get-random-values',
          'react-native-linear-gradient',
          'react-native-mmkv',
          'react-native-reanimated',
          'react-native-screens',
          'react-native-skottie',
          'react-native-svg',
          'react-native-video',
          'burnt',
        ],
      },
    },
    plugins: [
      react(),
    ],
  }),
));

