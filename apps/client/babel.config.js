module.exports = {
  presets: ['@rnx-kit/babel-preset-metro-react-native'],
  plugins: [
    'macros',
    'tsconfig-paths-module-resolver',
    ['react-native-reanimated/plugin', {
      relativeSourceLocation: false,
    }],
  ],
};
