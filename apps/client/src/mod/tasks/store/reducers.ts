import * as Tasks from './types';

export function add(store: Tasks.Store, action: Tasks.Add) {
  const {list, item} = action.payload;
  const newList = store[list] || {active: [], complete: []};
  const index = newList.complete.indexOf(item);
  if (index !== -1) {
    newList.complete.splice(index, 1);
    newList.active.push(item);
  } else if (!newList.active.includes(item)) {
    newList.active.unshift(item);
  }
  store[list] = newList;
}

export function complete(store: Tasks.Store, action: Tasks.Complete) {
  const {list, item} = action.payload;
  const newList = store[list] || {active: [], complete: []};
  const index = newList.active.indexOf(item);
  if (index !== -1) {
    newList.active.splice(index, 1);
  }
  if (!newList.complete.includes(item)) {
    newList.complete.unshift(item);
  }
  store[list] = newList;
}
