const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const {makeMetroConfig} = require('@rnx-kit/metro-config');
const {getDefaultConfig} = require('@react-native/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

module.exports = makeMetroConfig({
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
