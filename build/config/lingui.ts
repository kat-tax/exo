import type {LinguiConfig} from '@lingui/conf';
import {locales, sourceLocale} from 'config/locales';

export default <LinguiConfig> {
  locales: Object.keys(locales),
  sourceLocale,
  format: 'po',
  compileNamespace: 'json',
  catalogsMergePath: './client/src/app/i18n/provider/msg/{locale}',
  catalogs: [{
    path: 'locales/{locale}',
    include: [
      'client/src',
      'design/components',
    ],
    exclude: [
      '/__tests__/',
      '*.spec.*',
    ],
  }],
}
