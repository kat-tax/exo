import {KVService} from './Kv';

export type * from './Kv.interface';
export const KV = new KVService();
export const init = KV.init;
