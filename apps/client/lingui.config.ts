import type {LinguiConfig} from '@lingui/conf';

const config: LinguiConfig = {
  locales: ['en', 'de', 'es', 'pt', 'ja', 'ru', 'ar', 'id'],
  format: 'po',
  catalogs: [{
    path: 'src/assets/locales/{locale}',
    include: ['src'],
    exclude: ['**/node_modules/**', '/__tests__/', '*.spec.*'],
  }],
}

export default config;
