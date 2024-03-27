import * as Core from './types';

export function setLoaded($: Core.Store, action: Core.setLoaded) {
  $.loaded = action.payload;
}

export function setOnline($: Core.Store, action: Core.SetOnline) {
  $.online = action.payload;
}
