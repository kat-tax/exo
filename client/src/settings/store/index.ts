import {createSlice} from 'react-exo/redux';
import * as selectors from './selectors';
import * as reducers from './reducers';
import type {Store} from './types';

export default createSlice({
  name: 'settings',
  reducers,
  selectors,
  initialState: <Store> {},
});
