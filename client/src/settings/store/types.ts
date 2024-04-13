import type {ColorSchemeName} from 'react-native';
import type {PayloadAction} from 'react-exo/redux';
import type {Locales} from 'react-exo/i18n';

export type Store = {
  scheme?: ColorSchemeName,
  locale?: Locales,
}

export type SetScheme = PayloadAction<ColorSchemeName>
export type SetLocale = PayloadAction<Locales>
