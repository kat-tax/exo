import {createSelector as _} from '@reduxjs/toolkit';
import {getReducer as store} from 'store';

export const isLoaded = _(store, $ => $.core.loaded);
export const isOnline = _(store, $ => $.core.online);
