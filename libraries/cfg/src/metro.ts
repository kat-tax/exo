// @ts-ignore
import MetroSymlinksResolver from '@rnx-kit/metro-resolver-symlinks';
// @ts-ignore
import {makeMetroConfig} from '@rnx-kit/metro-config';
// @ts-ignore
import {getDefaultConfig} from '@react-native/metro-config';

const defaultConfig = getDefaultConfig(__dirname);

export default makeMetroConfig({
  resolver: {
    assetExts: defaultConfig.resolver.assetExts?.filter(ext => ext !== 'svg'),
    sourceExts: [...(defaultConfig.resolver.sourceExts || []), 'svg', 'mjs'],
    resolveRequest: MetroSymlinksResolver(),
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
});
