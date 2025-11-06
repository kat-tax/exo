import {concatUint8Arrays, stringToUint8Array} from 'uint8array-extras';
import {cmpRawString} from './utils';

export type bencodeValue =
  | string
  | Uint8Array
  | number
  | { [key: string]: bencodeValue }
  | bencodeValue[];

const te = new TextEncoder();

const encodeString = (str: string): Uint8Array => {
  const lengthBytes = new TextEncoder().encode(str.length.toString());
  const content = te.encode(str);

  const result = new Uint8Array(lengthBytes.byteLength + 1 + content.byteLength);
  result.set(lengthBytes);
  result.set(te.encode(':'), lengthBytes.byteLength);
  result.set(content, lengthBytes.byteLength + 1);

  return result;
};

const encodeBuf = (buf: Uint8Array): Uint8Array => {
  const lengthBytes = new TextEncoder().encode(buf.byteLength.toString());

  const result = new Uint8Array(lengthBytes.byteLength + 1 + buf.byteLength);
  result.set(lengthBytes);
  result.set(te.encode(':'), lengthBytes.byteLength);
  result.set(buf, lengthBytes.byteLength + 1);
  return result;
};

const encodeNumber = (num: number): Uint8Array => {
  // NOTE: only support integers
  const int = Math.floor(num);
  if (int !== num) {
    throw new Error(`bencode only support integers, got ${num}`);
  }

  return concatUint8Arrays([
    stringToUint8Array('i'),
    stringToUint8Array(int.toString()),
    stringToUint8Array('e'),
  ]);
};

const encodeDictionary = (obj: Record<string, bencodeValue>): Uint8Array => {
  const results: Uint8Array[] = [];

  Object.keys(obj)
    .sort(cmpRawString)
    .forEach(key => {
      results.push(encodeString(key));
      results.push(new Uint8Array(encode(obj[key]!)));
    });

  const d = stringToUint8Array('d');
  const e = stringToUint8Array('e');
  return concatUint8Arrays([d, ...results, e]);
};

const encodeArray = (arr: bencodeValue[]): Uint8Array => {
  const prefixSuffix = te.encode('le'); // Combined prefix and suffix
  const encodedElements = arr.map(encode); // Encode each element

  // Concatenate the encoded elements directly into a Uint8Array
  const result = concatUint8Arrays([prefixSuffix, ...encodedElements.flat()]);

  return result;
};

export const encode = (data: bencodeValue | bencodeValue[]): Uint8Array => {
  if (Array.isArray(data)) {
    return encodeArray(data);
  }

  switch (typeof data) {
    case 'string': {
      return encodeString(data);
    }

    case 'number': {
      return encodeNumber(data);
    }

    case 'object': {
      if (data instanceof Uint8Array) {
        return encodeBuf(data);
      }

      return encodeDictionary(data);
    }

    default: {
      throw new Error(`unsupport data type: ${typeof data}`);
    }
  }
};

export default encode;
