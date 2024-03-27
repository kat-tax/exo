import {createStore, get, set, del, clear} from 'idb-keyval';
import type {IStorage, IStorageDB} from './Storage.interface';

export class StorageService implements IStorage {
  init(id: string, version: number) {
    const db = createStore(id, `v${version}`);
    db('readwrite', () => {});
    return <IStorageDB> {
      getItem: (k, i) => get(k, db) ?? (i !== Object(i) ? i : undefined),
      setItem: (k, v) => set(k, v, db),
      removeItem: (k) => del(k, db),
      clear: () => clear(db),
    }
  }
}
