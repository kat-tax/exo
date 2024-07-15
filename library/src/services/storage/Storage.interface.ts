import type {Storage as Persist} from 'redux-persist';

/**
 * A service to manage persistent KV databases.
 * 
 * Supports `string`, `number`, `boolean`, and `Uint8Array` values, indexed by `string` keys.
 */
export interface StorageBase {
  /**
   * Initializes a storage database
   * 
   * @param id The unique identifier for the database
   * @param version The version of the database
   * @returns The storage database
   */
  init(id: string, version: number): StorageDB
}

/**
 * The storage database interface
 */
export interface StorageDB extends Persist {
  /** 
   * Gets a value from a key
   * 
   * @param key The key to lookup the value from
   * @param type The exact type of the value that is expected
   * @returns The value for the key, or `undefined` if not stored and no default value is provided
   * @examples
   *  ```ts
   *  getItem('age', Number)       // Type is a number
   *  getItem('name', String)      // Type is a string
   *  getItem('male', Boolean)     // Type is a boolean
   *  getItem('data', Uint8Array)  // Type is a Uint8Array
   *  getItem('greeting', 'Hello') // Type is a string and defaults to 'Hello' unless another greeting is stored.
   *  ```
   */
  getItem<T extends Widen<Primitive> = string, I = T>
    (key: string, type?: ItemAllowedType<T, I>)
      : Promise<ItemReturnType<T, I> | undefined>

  /**
   * Sets value for a key
   * 
   * @param key The key to store the value
   * @param value The value to store
   */
  setItem(key: string, value: Widen<Primitive>): Promise<void>

  /**
   * Removes a value for a key
   * 
   * @param key The key to remove the value
   */
  removeItem(key: string): Promise<void>

  /**
   * Clears all entries from the database
   */
  clear(): Promise<void>
}

/**
 * A utility class to validate data types
 */
export const validator = {
  /** Checks if the value is a boolean */
  isBoolean: (v?: unknown): v is boolean =>
    typeof v === 'boolean' || v === undefined,
  /** Checks if the value is a string */
  isString: (v?: unknown): v is string =>
    typeof v === 'string' || v === undefined,
  /** Checks if the value is a number */
  isNumber: (v?: unknown): v is number =>
    typeof v === 'number' || v === undefined,
  /** Checks if the value is a Uint8Array */
  isUint8Array: (v?: unknown): v is Uint8Array =>
    v instanceof Uint8Array || v === undefined,
}

type ItemAllowedType<T extends Primitive = string, I = T> = T extends I ? Constructor<I> | ItemInstance<T> : undefined;
type ItemReturnType<T extends Primitive = string, I = T> = T extends I ? Widen<ItemInstance<T>> : undefined;
type ItemInstance<T> = T extends Constructor<infer U> ? U : T;
type Constructor<T = Primitive> = new (...args: unknown[]) => T;
type Primitive = string | number | boolean | Uint8Array;
type Widen<T> = 
 T extends boolean ? boolean :
 T extends string ? string : 
 T extends number ? number : 
 T;
