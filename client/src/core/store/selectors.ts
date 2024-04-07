import type * as Core from './types';

export function isLoaded(store: Core.Store) {
  return store.loaded;
}

export function isOnline(store: Core.Store) {
  return store.online;
}
