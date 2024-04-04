import type * as Settings from './types';

export function getScheme(store: Settings.Store) {
  return store.scheme;
}

export function getLocale(store: Settings.Store) {
  return store.locale;
}
