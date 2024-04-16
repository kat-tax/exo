import {createSlice} from 'react-exo/redux';

import type {PayloadAction} from 'react-exo/redux';
import type {ColorSchemeName} from 'react-native';
import type {Locales} from 'config/locales';

export type Settings = {
  scheme?: ColorSchemeName,
  locale?: Locales,
}

export default createSlice({
  name: 'settings',
  initialState: <Settings> {},
  selectors: {
    getScheme: (settings) => settings.scheme,
    getLocale: (settings) => settings.locale,
  },
  reducers: {
    setScheme(settings, action: PayloadAction<ColorSchemeName>) {
      settings.scheme = action.payload;
    },
    setLocale(settings, action: PayloadAction<Locales>) {
      settings.locale = action.payload;
    },
  },
});
