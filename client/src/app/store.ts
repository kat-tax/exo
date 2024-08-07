import {createSlice} from 'react-exo/redux';
import {uuid} from 'app/utils/random';

import type {PayloadAction} from 'react-exo/redux';
import type {ColorSchemeName} from 'react-native';
import type {Locales} from 'config/locales';
import type {String50} from 'app/data';

export type App = {
  device: String50,
  loaded: boolean,
  online: boolean,
  locale?: Locales,
  scheme?: ColorSchemeName,
}

export default createSlice({
  name: 'app',
  initialState: <App> {
    online: false,
    loaded: false,
    device: uuid(),
  },
  selectors: {
    isLoaded: (app) => app.loaded,
    isOnline: (app) => app.online,
    getDevice: (app) => app.device,
    getLocale: (app) => app.locale,
    getScheme: (app) => app.scheme,
  },
  reducers: {
    setLoaded(app, action: PayloadAction<boolean>) {
      app.loaded = action.payload;
    },
    setOnline(app, action: PayloadAction<boolean>) {
      app.online = action.payload;
    },
    setLocale(settings, action: PayloadAction<Locales>) {
      settings.locale = action.payload;
    },
    setScheme(settings, action: PayloadAction<ColorSchemeName>) {
      settings.scheme = action.payload;
    },
  },
});
