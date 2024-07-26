import {createStore, get, set, del, clear} from 'idb-keyval';
import type {KVBase, KVDatabase} from './Kv.interface';

export class KVService implements KVBase {
  init(id: string, version: number) {
    const db = createStore(id, `v${version}`);
    db('readwrite', () => {});
    return <KVDatabase> {
      getItem: (k, i) => get(k, db) ?? (i !== Object(i) ? i : undefined),
      setItem: (k, v) => set(k, v, db),
      removeItem: (k) => del(k, db),
      clear: () => clear(db),
    }
  }
}
