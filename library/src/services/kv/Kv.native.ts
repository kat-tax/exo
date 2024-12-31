import {MMKV} from 'react-native-mmkv';
import {validator} from './Kv.interface';
import type {KVBase, KVDatabase} from './Kv.interface';

export class KVService implements KVBase {
  init(id: string, version: number) {
    const db = new MMKV({id, path: `v${version}`});
    return <KVDatabase>{
      getItem: async (k, i) => {
        switch (true) {
          case validator.isBoolean(i):
            return db.getBoolean(k) ?? i;
          case validator.isString(i):
            return db.getString(k) ?? i;
          case validator.isNumber(i):
            return db.getNumber(k) ?? i;
          case validator.isArrayBuffer(i):
            return db.getBuffer(k) ?? i;
          default:
            return undefined;
        }
      },
      setItem: async (k, v) => db.set(k, v),
      removeItem: async (k) => db.delete(k),
      clear: async () => db.clearAll(),
    };
  }
}
