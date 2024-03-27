import {createSlice} from '@reduxjs/toolkit';
import * as reducers from './reducers';
import * as Tasks from './types';

export const initialState: Tasks.Store = {};

export default createSlice({
  name: 'tasks',
  initialState,
  reducers,
});
