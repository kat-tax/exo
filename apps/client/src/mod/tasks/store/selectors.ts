import {createSelector as _} from '@reduxjs/toolkit';
import {getReducer as store} from 'store';

export const getLists = _(store, $ => Object.keys($.tasks));
export const getActive = (list: string) => _(store, $ => $.tasks[list]?.active);
export const getComplete = (list: string) => _(store, $ => $.tasks[list]?.complete);
