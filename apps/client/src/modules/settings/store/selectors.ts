import {createSelector as _} from '@reduxjs/toolkit';
import {getReducer as store} from 'common/store';

export const getScheme = _(store, $ => $.settings.scheme);
export const getLanguage = _(store, $ => $.settings.locale);
