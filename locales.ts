/** Supported languages **/

export type Locales = keyof typeof locales;

export const sourceLocale: Locales = 'en';
export const locales = {
  en: 'English',
  ru: 'Русский',
  ja: 'やまと',
  ar: 'عربي',
} as const;
