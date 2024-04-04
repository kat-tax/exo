import type * as Tasks from './types';

export function getLists(store: Tasks.Store) {
  return Object.keys(store);
}

export function getActive(store: Tasks.Store) {
  return (list: string) => store[list]?.active;
}

export function getComplete(store: Tasks.Store) {
  return (list: string) => store[list]?.complete;
}
