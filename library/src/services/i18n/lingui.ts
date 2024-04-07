import type {LinguiConfig} from '@lingui/conf';
import sourceLocale, {locales} from 'config/locales';

export default <LinguiConfig> {
  locales: Object.keys(locales),
  sourceLocale,
  format: 'po',
  compileNamespace: 'ts',
  catalogsMergePath: './library/src/services/i18n/messages/{locale}',
  catalogs: [{
    path: './locales/{locale}',
    include: [
      './apps/client/src/**/*.{ts,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '/__tests__/',
      '*.spec.*',
    ],
  }],
}
