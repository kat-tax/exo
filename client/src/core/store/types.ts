import type {PayloadAction} from 'react-exo/redux';

export type Store = {
  loaded?: boolean,
  online?: boolean,
}

export type SetLoaded = PayloadAction<boolean>
export type SetOnline = PayloadAction<boolean>
