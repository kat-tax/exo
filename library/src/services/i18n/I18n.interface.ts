import type {locales, default as sourceLocale} from 'config/locales';

export interface I18nBase {
  getLocale(short?: boolean): string,
  loadLocale(locale?: Locales): Promise<void>,
}

export type Locales = keyof typeof locales;
export type LocaleSource = typeof sourceLocale;
export type Messages = Record<Locales, {
  messages: Record<string, string>
}>
