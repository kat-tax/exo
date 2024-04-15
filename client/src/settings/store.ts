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
    getScheme: ($) => $.scheme,
    getLocale: ($) => $.locale,
  },
  reducers: {
    setScheme($, action: PayloadAction<ColorSchemeName>) {
      $.scheme = action.payload;
    },
    setLocale($, action: PayloadAction<Locales>) {
      $.locale = action.payload;
    },
  },
});
