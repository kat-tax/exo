import {createSlice} from 'react-exo/redux';

import type {PayloadAction} from 'react-exo/redux';
import type {ColorSchemeName} from 'react-native';
import type {Locales} from 'config/locales';

export type App = {
  locale?: Locales,
  scheme?: ColorSchemeName,
}

export default createSlice({
  name: 'app',
  initialState: <App> {},
  selectors: {
    getLocale: (app) => app.locale,
    getScheme: (app) => app.scheme,
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
