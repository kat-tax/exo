import {createSlice} from 'react-exo/redux';
import type {PayloadAction} from 'react-exo/redux';

export type Core = {
  loaded?: boolean,
  online?: boolean,
}

export default createSlice({
  name: 'core',
  initialState: <Core> {
    online: false,
    loaded: false,
  },
  selectors: {
    isLoaded: (core) => core.loaded,
    isOnline: (core) => core.online,
  },
  reducers: {
    setLoaded(core, action: PayloadAction<boolean>) {
      core.loaded = action.payload;
    },
    setOnline(core, action: PayloadAction<boolean>) {
      core.online = action.payload;
    },
  },
});
