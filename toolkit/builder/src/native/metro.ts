// @ts-nocheck

import {makeMetroConfig} from '@rnx-kit/metro-config';
import {getDefaultConfig} from '@react-native/metro-config';
import MetroSymlinksResolver from '@rnx-kit/metro-resolver-symlinks';

const defaultConfig = getDefaultConfig(__dirname);

export default makeMetroConfig({
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
    sourceExts: [...(defaultConfig.resolver.sourceExts || []), 'svg', 'mjs'],
    assetExts: defaultConfig.resolver.assetExts?.filter(ext => ext !== 'svg'),
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
