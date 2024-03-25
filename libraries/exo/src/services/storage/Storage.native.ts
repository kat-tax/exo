import {MMKV} from 'react-native-mmkv';
import type {IStorage} from './Storage.interface';

export class StorageImpl implements IStorage {
  init(id: string, version: number) {
    const db = new MMKV({id, path: `v${version}`});
    return {
      setItem: (key: string, value: any) => {
        db.set(key, value);
        return Promise.resolve(true);
      },
      getItem: (key: string) => {
        const value = db.getString(key);
        return Promise.resolve(value);
      },
      removeItem: (key: string) => {
        db.delete(key);
        return Promise.resolve();
      },
      clear: () => {
        db.clearAll();
        return Promise.resolve();
      }
    };
  }
}
