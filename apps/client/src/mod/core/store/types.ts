import type {PayloadAction} from '@reduxjs/toolkit';

export type Store = {
  loaded?: boolean,
  online?: boolean,
}

export type setLoaded = PayloadAction<boolean>
export type SetOnline = PayloadAction<boolean>
