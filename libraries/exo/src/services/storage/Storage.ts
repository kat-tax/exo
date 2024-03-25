import {createStore, get, set, del, clear} from 'idb-keyval';
import type {IStorage} from './Storage.interface';

export class StorageImpl implements IStorage {
  init(id: string, version: number) {
    const db = createStore(id, `v${version}`);
    return {
      getItem: (key: string) => get(key, db),
      setItem: (key: string, value: any) => set(key, value, db),
      removeItem: (key: string) => del(key, db),
      clear: () => clear(db),
    };
  }
}
