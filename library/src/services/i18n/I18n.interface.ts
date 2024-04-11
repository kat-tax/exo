import type {Locales, sourceLocale} from 'config/locales';

export interface I18nBase {
  getLocale(short?: boolean): string,
  loadLocale(locale?: Locales): Promise<void>,
}

export type LocaleSource = typeof sourceLocale;
export type Messages = Record<Locales, {
  messages: Record<string, string>
}>
