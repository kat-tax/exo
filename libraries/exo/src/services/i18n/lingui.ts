import type {LinguiConfig} from '@lingui/conf';
import sourceLocale, {locales} from 'cfg/locales';

export default <LinguiConfig> {
  format: 'po',
  locales: locales as unknown as string[],
  sourceLocale,
  compileNamespace: 'ts',
  catalogsMergePath: "./libraries/exo/src/services/i18n/messages/{locale}",
  catalogs: [{
    path: './content/locales/{locale}',
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
