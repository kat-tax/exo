import {createStore, get, set, del, clear} from 'idb-keyval';
import type {StorageService, IStorageDB} from './Storage.interface';

export class Storage implements StorageService {
  async init(id: string, version: number) {
    const db = createStore(id, `v${version}`);
    return db('readwrite', () => {}).then((): IStorageDB => ({
      getItem: (k, i) => get(k, db) ?? (i !== Object(i) ? i : undefined),
      setItem: (k, v) => set(k, v, db),
      removeItem: (k) => del(k, db),
      clear: () => clear(db),
    }));
  }
}
