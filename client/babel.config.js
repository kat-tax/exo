/** @type {import('@babel/core').ConfigAPI} */

module.exports = {
  presets: [
    ["@rnx-kit/babel-preset-metro-react-native", {
      additionalPlugins: [
        'macros',
        'tsconfig-paths-module-resolver',
        'react-exo/babel-plugin-iconify-extract',
        'react-exo/babel-plugin-iconify-transform',
      ]
    }]
  ],
};
