import {createSlice} from 'react-exo/redux';

import type {PayloadAction} from 'react-exo/redux';
import type {ColorSchemeName} from 'react-native';
import type {Locales} from 'config/locales';

export type Settings = {
  locale?: Locales,
  scheme?: ColorSchemeName,
  groqKey?: string,
  groqModel?: string,
  displayName?: string,
}

export default createSlice({
  name: 'settings',
  initialState: <Settings> {},
  selectors: {
    getLocale: (settings) => settings.locale,
    getScheme: (settings) => settings.scheme,
    getGroqKey: (settings) => settings.groqKey,
    getGroqModel: (settings) => settings.groqModel,
    getDisplayName: (settings) => settings.displayName,
  },
  reducers: {
    setLocale(settings, action: PayloadAction<Locales>) {
      settings.locale = action.payload;
    },
    setScheme(settings, action: PayloadAction<ColorSchemeName>) {
      settings.scheme = action.payload;
    },
    setGroqKey(settings, action: PayloadAction<string>) {
      settings.groqKey = action.payload;
    },
    setGroqModel(settings, action: PayloadAction<string>) {
      settings.groqModel = action.payload;
    },
    setDisplayName(settings, action: PayloadAction<string>) {
      settings.displayName = action.payload;
    },
  },
});
