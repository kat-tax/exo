import {createSlice} from 'react-exo/redux';
import type {PayloadAction} from 'react-exo/redux';

export type App = {
  loaded?: boolean,
  online?: boolean,
}

export default createSlice({
  name: 'app',
  initialState: <App> {
    online: false,
    loaded: false,
  },
  selectors: {
    isLoaded: (app) => app.loaded,
    isOnline: (app) => app.online,
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
