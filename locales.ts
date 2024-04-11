export type Locales = keyof typeof locales;

export const sourceLocale: Locales = 'en';
export const locales = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  pt: 'Portugués',
  ja: 'Bahasa Indonesia',
  ru: 'Русский',
  ar: 'やまと',
  id: 'عربي',
} as const;
