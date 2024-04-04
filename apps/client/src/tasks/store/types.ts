import type {PayloadAction} from 'react-exo/redux';

export type Store = Record<string, {
  active: string[],
  complete: string[],
}>

export type Add = PayloadAction<{list: string, item: string}>
export type Complete = PayloadAction<{list: string, item: string}>
