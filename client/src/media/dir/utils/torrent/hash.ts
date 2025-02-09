import {uint8ArrayToHex} from 'uint8array-extras';
import {encode} from './bencode';

export async function hash(file: Uint8Array): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-1', encode(file));
  return uint8ArrayToHex(new Uint8Array(hash));
}
