/** @type {import('@babel/core').ConfigAPI} */

module.exports = {
  presets: [
    ["@rnx-kit/babel-preset-metro-react-native", {
      additionalPlugins: [
        'macros',
        'tsconfig-paths-module-resolver',
        require('react-exo/babel-plugin-iconify'),
        ['@rnx-kit/babel-plugin-import-path-remapper', {
          test: (path) => path.startsWith('react-exo/'),
          remap: (_, path) => `${__dirname}/node_modules/react-exo/gen/native/${path}`,
        }],
      ]
    }]
  ],
};
