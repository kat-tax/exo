import {createSlice} from '@reduxjs/toolkit';
import * as reducers from './reducers';
import * as Core from './types';

export const initialState: Core.Store = {
  loaded: false,
  online: false,
};

export default createSlice({
  name: 'core',
  initialState,
  reducers,
});
