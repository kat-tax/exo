import {StorageService} from './Storage';

export type * from './Storage.interface';
export const Storage = new StorageService();
export const init = Storage.init;

