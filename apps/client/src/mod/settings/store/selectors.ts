import {createSelector as _} from '@reduxjs/toolkit';
import {getReducer as store} from 'store';

export const getScheme = _(store, $ => $.settings.scheme);
export const getLocale = _(store, $ => $.settings.locale);
