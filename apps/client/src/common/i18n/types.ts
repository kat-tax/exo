export type Messages = Record<Locales, {
  messages: Record<string, string>
}>;

export type Locales =
  | 'en'
  | 'de'
  | 'es'
  | 'pt'
  | 'ja'
  | 'ru'
  | 'ar'
  | 'id';
