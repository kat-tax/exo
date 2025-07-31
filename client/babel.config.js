/** @type {import('@babel/core').ConfigAPI} */
module.exports = {
  plugins: [
    'macros',
    'tsconfig-paths-module-resolver',
    'react-exo/babel-plugin-iconify-extract',
    'react-exo/babel-plugin-iconify-transform',
    '@lingui/babel-plugin-lingui-macro',
  ],
  presets: [
    '@react-native/babel-preset',
  ],
};
