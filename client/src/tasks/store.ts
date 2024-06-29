import {createSlice, createSelector as $} from 'react-exo/redux';
import {getPlatforms} from 'app/utils/platform';

import type {PayloadAction} from 'react-exo/redux';

export type Tasks = Record<string, {
  active: string[],
  complete: string[],
}>

export default createSlice({
  name: 'tasks',
  initialState: <Tasks> {
    'Launch': {
      active: getPlatforms(),
      complete: [],
    }, 
  },
  selectors: {
    getLists: $((x: Tasks) => x, (tasks) =>
      Object.keys(tasks).map((list) => ({
        id: list,
        complete: tasks[list]?.active.length === 0 &&
          tasks[list]?.complete.length > 0,
      }))
    ),
    getActive: (tasks, list: string) => (
      tasks[list]?.active
    ),
    getComplete: (tasks, list: string) => (
      tasks[list]?.complete
    ),
  },
  reducers: {
    add(tasks, action: PayloadAction<{list: string, item: string}>) {
      const {list, item} = action.payload;
      const items = tasks[list] || {active: [], complete: []};
      const index = items.complete.indexOf(item);
      if (index !== -1) {
        items.complete.splice(index, 1);
        items.active.push(item);
      } else if (!items.active.includes(item)) {
        items.active.push(item);
      }
      tasks[list] = items;
    },
    complete(tasks, action: PayloadAction<{list: string, item: string}>) {
      const {list, item} = action.payload;
      const items = tasks[list] || {active: [], complete: []};
      const index = items.active.indexOf(item);
      if (index !== -1)
        items.active.splice(index, 1);
      if (!items.complete.includes(item))
        items.complete.unshift(item);
      tasks[list] = items;
    },
  },
});
