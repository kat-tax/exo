import type {LinguiConfig} from '@lingui/conf';
import sourceLocale, {locales} from 'cfg/locales';

export default <LinguiConfig> {
  format: 'po',
  sourceLocale,
  locales: locales as unknown as string[],
  catalogs: [{
    path: '../../../../../content/locales/{locale}',
    include: [
      '../../../../../apps/client/src/**/*.{ts,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '/__tests__/',
      '*.spec.*',
    ],
  }],
}
