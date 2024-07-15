import {MMKV} from 'react-native-mmkv';
import {validator} from './Storage.interface';
import type {StorageBase, StorageDB} from './Storage.interface';

export class StorageService implements StorageBase {
  init(id: string, version: number) {
    const db = new MMKV({id, path: `v${version}`});
    return <StorageDB>{
      getItem: async (k, i) => {
        switch (true) {
          case validator.isBoolean(i):
            return db.getBoolean(k) ?? i;
          case validator.isString(i):
            return db.getString(k) ?? i;
          case validator.isNumber(i):
            return db.getNumber(k) ?? i;
          case validator.isUint8Array(i):
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
