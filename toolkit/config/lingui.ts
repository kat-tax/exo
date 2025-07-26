import type {LinguiConfig} from '@lingui/conf';
import {locales, sourceLocale} from 'config/locales';

export default <LinguiConfig> {
  locales: Object.keys(locales),
  sourceLocale,
  format: 'po',
  compileNamespace: 'ts',
  catalogsMergePath: './client/src/app/i18n/messages/{locale}',
  catalogs: [{
    path: 'translations/{locale}',
    include: [
      'client',
      'design',
    ],
    exclude: [
      '**/node_modules/**',
      '/__tests__/',
      '*.spec.*',
    ],
  }],
}
