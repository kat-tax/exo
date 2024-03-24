import * as Settings from './types';

export function setScheme($: Settings.Store, action: Settings.SetScheme) {
  $.scheme = action.payload;
}

export function setLocale($: Settings.Store, action: Settings.SetLocale) {
  $.locale = action.payload;
}
