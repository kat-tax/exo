import type {LinguiConfig} from '@lingui/conf';

export type Locales = typeof locales;

export const locales = [
  'en',
  'de',
  'es',
  'pt',
  'ja',
  'ru',
  'ar',
  'id',
] as const;

export default <LinguiConfig> {
  locales: Array.from(locales),
  format: 'po',
  catalogs: [{
    path: '../../content/locales/{locale}',
    include: [
      '../../apps/client/src/**/*.{ts,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '/__tests__/',
      '*.spec.*',
    ],
  }],
}
