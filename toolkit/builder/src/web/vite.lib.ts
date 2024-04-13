import {defineConfig, mergeConfig} from 'vite';
import baseConfig from './vite.base.js';
import plugins from './plugins/lib/index.js';

export default defineConfig(env => mergeConfig(
  baseConfig(env),
  defineConfig({
    plugins,
    build: {
      outDir: 'gen',
      cssMinify: 'lightningcss',
      cssCodeSplit: true,
      sourcemap: true,
      lib: {
        formats: ['es', 'cjs'],
        entry: {
          /* Entry */
          index: 'src/index.ts',
          /* Assets */
          icon: 'src/assets/icon/Icon.export',
          image: 'src/assets/image/Image.export',
          video: 'src/assets/video/Video.export',
          lottie: 'src/assets/lottie/Lottie.export',
          rive: 'src/assets/rive/Rive.export',
          /* Services */
          storage: 'src/services/storage/Storage.export',
          device: 'src/services/device/Device.export',
          redux: 'src/services/redux/Redux.export',
          i18n: 'src/services/i18n/I18n.export',
          form: 'src/services/form/Form.export',
          /* Layout */
          navigation: 'src/layout/navigation/Navigation.export',
          gesture: 'src/layout/gesture/Gesture.export',
          motion: 'src/layout/motion/Motion.export',
          safearea: 'src/layout/safe-area/SafeArea.export',
          /* Widgets */
          calendar: 'src/widgets/calendar/Calendar.export',
          progress: 'src/widgets/progress/Progress.export',
          slider: 'src/widgets/slider/Slider.export',
          radio: 'src/widgets/radio/Radio.export',
          switch: 'src/widgets/switch/Switch.export',
          picker: 'src/widgets/picker/Picker.export',
          checkbox: 'src/widgets/checkbox/Checkbox.export',
          /* Hooks */
          variants: 'src/hooks/useVariants',
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
          /* Web */
          '@vidstack/react',
          '@dotlottie/common',
          '@dotlottie/react-player'
        ],
        output: {
          chunkFileNames: 'chunks/[format]/[hash]/[name].js',
        },
      },
    },
    optimizeDeps: {
      exclude: [
        '@dotlottie/react-player',
        '@dotlottie/common'
      ],
    },
  }),
));

