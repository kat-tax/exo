// Workaround to resolve design package imports for metro
// This should use tsconfig path in design workspace instead
// But the tsconfig resolver is only working in the client workspace
const createResolve = require('babel-plugin-tsconfig-paths-module-resolver/create-resolve');
const path = require('path');
const _resolvePath = createResolve();
function resolvePath(sourceFile, currentFile, opts) {
  const result = _resolvePath(sourceFile, currentFile, opts);
  if (path.normalize(currentFile).includes(path.join('design', 'components'))) {
    if (result === null && sourceFile.startsWith('components/')) {
      return sourceFile.replace('components/', '../../../');
    }
  }
  return result;
}

/** @type {import('@babel/core').ConfigAPI} */
module.exports = {
  plugins: [
    'macros',
    ['tsconfig-paths-module-resolver', {resolvePath}],
    'react-exo/babel-plugin-iconify/extract',
    'react-exo/babel-plugin-iconify/transform',
    '@lingui/babel-plugin-lingui-macro',
  ],
  presets: [
    '@react-native/babel-preset',
  ],
};
