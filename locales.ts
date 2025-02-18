/** Supported languages **/

export type Locales = keyof typeof locales;

export const sourceLocale: Locales = 'en';
export const locales = {
  en: 'English',
  es: 'Español',
  ru: 'Русский',
  ja: 'やまと',
  ko: '한국어',
  ar: 'عربي',
} as const;
