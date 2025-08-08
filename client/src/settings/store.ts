import {createSlice} from 'react-exo/redux';

import type {PayloadAction} from 'react-exo/redux';
import type {ColorSchemeName} from 'react-native';
import type {Locales} from 'config/locales';

export type Settings = {
  locale?: Locales,
  scheme?: ColorSchemeName,
}

export default createSlice({
  name: 'settings',
  initialState: <Settings> {},
  selectors: {
    getLocale: (settings) => settings.locale,
    getScheme: (settings) => settings.scheme,
  },
  reducers: {
    setLocale(settings, action: PayloadAction<Locales>) {
      settings.locale = action.payload;
    },
    setScheme(settings, action: PayloadAction<ColorSchemeName>) {
      settings.scheme = action.payload;
    },
  },
});
