import {createStore, get, set, del, clear} from 'idb-keyval';
import type {StorageBase, StorageDB} from './Storage.interface';

export class StorageService implements StorageBase {
  init(id: string, version: number) {
    const db = createStore(id, `v${version}`);
    db('readwrite', () => {});
    return <StorageDB> {
      getItem: (k, i) => get(k, db) ?? (i !== Object(i) ? i : undefined),
      setItem: (k, v) => set(k, v, db),
      removeItem: (k) => del(k, db),
      clear: () => clear(db),
    }
  }
}
