import {createSlice} from 'react-exo/redux';
import type {PayloadAction} from 'react-exo/redux';

export type Tasks = Record<string, {
  active: string[],
  complete: string[],
}>

export default createSlice({
  name: 'tasks',
  initialState: <Tasks> {
    Demo: {active: ['Test'], complete: []},
  },
  selectors: {
    getLists: ($) => Object.keys($),
    getActive: ($, list: string) => $[list]?.active,
    getComplete: ($, list: string) => $[list]?.complete,
  },
  reducers: {
    add(store, action: PayloadAction<{list: string, item: string}>) {
      const {list, item} = action.payload;
      const tasks = store[list] || {active: [], complete: []};
      const index = tasks.complete.indexOf(item);
      if (index !== -1) {
        tasks.complete.splice(index, 1);
        tasks.active.push(item);
      } else if (!tasks.active.includes(item)) {
        tasks.active.unshift(item);
      }
      store[list] = tasks;
    },
    complete(store, action: PayloadAction<{list: string, item: string}>) {
      const {list, item} = action.payload;
      const tasks = store[list] || {active: [], complete: []};
      const index = tasks.active.indexOf(item);
      if (index !== -1)
        tasks.active.splice(index, 1);
      if (!tasks.complete.includes(item))
        tasks.complete.unshift(item);
      store[list] = tasks;
    },
  },
});
