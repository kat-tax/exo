module.exports = api => {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'macros',
      'tsconfig-paths-module-resolver',
      ['react-native-reanimated/plugin', {
        relativeSourceLocation: false,
      }],
    ]
  }
}
