const fs = require('fs');
const path = require('path');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');
// const {getPlatformResolver} = require('@callstack/out-of-tree-platforms');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const pkg = require('../../package.json');
const root = path.resolve(__dirname, '../..')
const modules = Object.keys({...pkg.peerDependencies});
const rnwPath = fs.realpathSync(path.resolve(require.resolve('react-native-windows/package.json'), '..'));

const defaultConfig = getDefaultConfig(__dirname);
const config = {
  projectRoot: __dirname,
  watchFolders: [root],
  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the root, and alias them to the versions in example's node_modules
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [...(defaultConfig.resolver.sourceExts || []), 'svg', 'mjs'],
    assetExts: defaultConfig.resolver.assetExts?.filter(ext => ext !== 'svg'),
    blockList: exclusionList([
      // This stops "react-native run-windows" from causing the metro server to crash if its already running
      new RegExp(`${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`),
      // This prevents "react-native run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip or other files produced by msbuild
      new RegExp(`${rnwPath}/build/.*`),
      new RegExp(`${rnwPath}/target/.*`),
      /.*\.ProjectImports\.zip/,
    ]),
    blacklistRE: exclusionList(
      modules.map(module => new RegExp(`^${escape(path.join(root, 'node_modules', module))}\\/.*$`))
    ),
    extraNodeModules: modules.reduce((acc, name) => ({
      ...acc,
      [name]: path.join(__dirname, 'node_modules', name)
    }), {}),
    // resolveRequest: getPlatformResolver({
    //   platformNameMap: {visionos: '@callstack/react-native-visionos'}
    // }),
  },
  transformer: {
    // This fixes the 'missing-asset-registry-path` error (see https://github.com/microsoft/react-native-windows/issues/11437)
    assetRegistryPath: 'react-native/Libraries/Image/AssetRegistry',
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
