import {createSlice} from 'react-exo/redux';
import * as selectors from './selectors';
import * as reducers from './reducers';
import type {Store} from './types';

export default createSlice({
  name: 'core',
  reducers,
  selectors,
  initialState: <Store> {
    loaded: false,
    online: false,
  },
});
