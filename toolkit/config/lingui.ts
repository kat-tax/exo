import type {LinguiConfig} from '@lingui/conf';
import {locales, sourceLocale} from 'config/locales';

export default <LinguiConfig> {
  locales: Object.keys(locales),
  sourceLocale,
  format: 'po',
  compileNamespace: 'ts',
  catalogsMergePath: './client/src/app/locales/messages/{locale}',
  catalogs: [{
    path: 'translations/{locale}',
    include: [
      './client/src/**/*.{ts,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '/__tests__/',
      '*.spec.*',
    ],
  }],
}
