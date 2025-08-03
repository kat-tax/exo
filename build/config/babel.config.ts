import path from 'path';
import createResolve from 'babel-plugin-tsconfig-paths-module-resolver/create-resolve';
import type {TransformOptions} from '@babel/core';

// Workaround to resolve design package imports for metro
// This should use tsconfig path in design workspace instead
// But the tsconfig resolver is only working in the client workspace
const defaultResolvePath = createResolve();
const resolvePath = (sourceFile: string, currentFile: string, opts: any) => {
  const result = defaultResolvePath(sourceFile, currentFile, opts);
  if (path.normalize(currentFile).includes(path.join('design', 'components'))) {
    if (result === null && sourceFile.startsWith('components/')) {
      return sourceFile.replace('components/', '../../../');
    }
  }
  return result;
};

export default <TransformOptions> {
  presets: [
    '@react-native/babel-preset',
  ],
  plugins: [
    'macros',
    ['tsconfig-paths-module-resolver', {resolvePath}],
    '@lingui/babel-plugin-lingui-macro',
    'react-exo/babel-plugin-iconify-extract',
    'react-exo/babel-plugin-iconify-transform',
    '@babel/plugin-transform-export-namespace-from',
    '@babel/plugin-transform-dynamic-import',
  ],
};
