import type * as Core from './types';

export function setLoaded(store: Core.Store, action: Core.SetLoaded) {
  store.loaded = action.payload;
}

export function setOnline(store: Core.Store, action: Core.SetOnline) {
  store.online = action.payload;
}
