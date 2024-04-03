import type {LinguiConfig} from '@lingui/conf';

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

export type Locales = typeof locales;

export default <LinguiConfig> {
  format: 'po',
  locales: locales as unknown as string[],
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
