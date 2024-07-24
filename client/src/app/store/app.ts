import {createSlice} from 'react-exo/redux';
import {uuid} from 'app/utils/random';

import type {String50} from 'app/data';
import type {PayloadAction} from 'react-exo/redux';

export type App = {
  device: String50,
  loaded?: boolean,
  online?: boolean,
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
  },
  reducers: {
    setLoaded(app, action: PayloadAction<boolean>) {
      app.loaded = action.payload;
    },
    setOnline(app, action: PayloadAction<boolean>) {
      app.online = action.payload;
    },
  },
});
