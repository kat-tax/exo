import type {ColorSchemeName} from 'react-native';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Locales} from 'common/i18n/types';

export type Store = {
  scheme?: ColorSchemeName,
  locale?: Locales,
}

export type SetScheme = PayloadAction<ColorSchemeName>
export type SetLocale = PayloadAction<Locales>
