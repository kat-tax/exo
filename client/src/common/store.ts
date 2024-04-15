import {createSlice} from 'react-exo/redux';
import type {PayloadAction} from 'react-exo/redux';

export type Common = {
  loaded?: boolean,
  online?: boolean,
}

export default createSlice({
  name: 'common',
  initialState: <Common> {
    online: false,
    loaded: false,
  },
  selectors: {
    isLoaded: ($) => $.loaded,
    isOnline: ($) => $.online,
  },
  reducers: {
    setLoaded(store, action: PayloadAction<boolean>) {
      store.loaded = action.payload;
    },
    setOnline(store, action: PayloadAction<boolean>) {
      store.online = action.payload;
    },
  },
});
