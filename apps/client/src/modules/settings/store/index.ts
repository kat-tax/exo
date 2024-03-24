import {createSlice} from '@reduxjs/toolkit';
import * as reducers from './reducers';
import * as Settings from './types';

export const initialState: Settings.Store = {};

export default createSlice({
  name: 'settings',
  initialState,
  reducers,
});
