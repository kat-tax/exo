import {MMKV} from 'react-native-mmkv';
import {StorageDataCheck} from './Storage.interface';
import type {IStorage, IStorageDB} from './Storage.interface';

export class StorageService implements IStorage {
  init(id: string, version: number) {
    const db = new MMKV({id, path: `v${version}`});
    return <IStorageDB>{
      getItem: async (k, i) => {
        switch (true) {
          case StorageDataCheck.isBoolean(i):
            return db.getBoolean(k) ?? i;
          case StorageDataCheck.isString(i):
            return db.getString(k) ?? i;
          case StorageDataCheck.isNumber(i):
            return db.getNumber(k) ?? i;
          case StorageDataCheck.isUint8Array(i):
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
