import type * as Settings from './types';

export function setScheme(store: Settings.Store, action: Settings.SetScheme) {
  store.scheme = action.payload;
}

export function setLocale(store: Settings.Store, action: Settings.SetLocale) {
  store.locale = action.payload;
}
