import {Hfs} from '../core';
import {Retrier} from '@humanwhocodes/retry';
import {createHelia} from 'helia';
import {unixfs} from '@helia/unixfs';
import {CID} from 'multiformats/cid';

import type {HfsImpl, HfsDirectoryEntry} from '../core/types';
import type {UnixFS} from '@helia/unixfs';

const RETRY_ERROR_CODES = new Set(['ENFILE', 'EMFILE']);
type FSError = {code: string};

/**
 * A class representing React Native implementation of Hfs.
 */
export class IpfsHfsImpl implements HfsImpl {
  /**
   * The file system module to use.
   */
  #root: UnixFS;

  /**
   * The retryer object used for retrying operations.
   */
  #retrier: Retrier;

  /**
   * Creates a new instance.
   */
  constructor({root}: {root: UnixFS}) {
    this.#root = root;
    this.#retrier = new Retrier((error: FSError) =>
      RETRY_ERROR_CODES.has(error.code));
  }

  /**
   * Reads a file and returns the contents as an Uint8Array.
   * @throws {Error} If the file cannot be read.
   * @throws {TypeError} If the file path is not a string.
   */
  async bytes(filePath: string): Promise<Uint8Array | undefined> {
    const {src} = parse(filePath);
    return this.#retrier
      .retry(() => this.#root.cat(src))
      .catch((error: FSError) => {
        if (error.code === 'ENOENT')
          return undefined;
        throw error;
      });
  }

  /**
   * Writes a value to a file, creating any necessary directories along the way.
   * If the value is a string, UTF-8 encoding is used.
   * @throws {TypeError} If the file path is not a string.
   * @throws {Error} If the file cannot be written.
   */
  async write(filePath: string, contents: Uint8Array | string): Promise<void> {
    const op = () => {
      let data: Uint8Array;
      if (typeof contents === 'string') {
        const writable = new TextEncoder();
        const readable = writable.encode(contents);
        data = readable;
      } else {
        data = contents;
      }
      this.#root.addBytes(data);
    }

    const {name} = parse(filePath);
    return this.#retrier.retry(op).catch(async (error: FSError) => {
      if (error.code === 'ENOENT')
        return this.createDirectory(name).then(op);
      throw error;
    });
  }

  /**
   * Appends a value to a file. If the value is a string, UTF-8 encoding is used.
   * @throws {TypeError} If the file path is not a string.
   * @throws {Error} If the file cannot be appended to.
   */
  async append(filePath: string, contents: Uint8Array): Promise<void> {
    // TODO: implement appending file (delete original, combine old data w/ new)
    const op = () => {
      if (typeof contents === 'string') {
        this.#root.addFile(contents);
      } else {
        this.#root.addBytes(contents);
        // TODO: handle Uint8Array
        // https://github.com/alpha0010/react-native-file-access/issues/78
      }
    }

    const {name} = parse(filePath);
    return this.#retrier.retry(op).catch(async (error: FSError) => {
      if (error.code === 'ENOENT')
        return this.createDirectory(name).then(op);
      throw error;
    });
  }

  /**
   * Checks if a file exists.
   * @throws {Error} If the operation fails with a code other than ENOENT.
   */
  async isFile(filePath: string): Promise<boolean> {
    const {src} = parse(filePath);
    return this.#root
      .stat(src)
      .then(stat => stat.type === 'file')
      .catch((error: FSError) => {
        if (error.code === 'ENOENT')
          return false;
        throw error;
      });
  }

  /**
   * Checks if a directory exists.
   * @throws {Error} If the operation fails with a code other than ENOENT.
   */
  async isDirectory(dirPath: string): Promise<boolean> {
    const {src} = parse(dirPath);
    return this.#root
      .stat(src)
      .then(stat => stat.type === 'directory')
      .catch((error: FSError) => {
        if (error.code === 'ENOENT')
          return false;
        throw error;
      });
  }

  /**
   * Creates a directory recursively.
   */
  async createDirectory(dirPath: string): Promise<void> {
    const {src} = parse(dirPath);
    await this.#root.mkdir(src, dirPath);
  }

  /**
   * Deletes a file or empty directory.
   * @throws {TypeError} If the file or directory path is not a string.
   * @throws {Error} If the file or directory cannot be deleted.
   */
  async delete(filePath: string): Promise<boolean> {
    const {src} = parse(filePath);
    return this.#root
      .rm(src, filePath)
      .then(() => true)
      .catch((error: FSError) => {
        if (error.code === 'ENOENT')
          return false;
        throw error;
      });
  }

  /**
   * Deletes a file or directory recursively.
   * @throws {TypeError} If the file or directory path is not a string.
   * @throws {Error} If the file or directory cannot be deleted.
   * @throws {Error} If the file or directory is not found.
   */
  async deleteAll(filePath: string): Promise<boolean> {
    const {src} = parse(filePath);  
    return this.#root
      .rm(src, filePath)
      .then(() => true)
      .catch((error: FSError) => {
        if (error.code === 'ENOENT')
          return false;
        throw error;
      });
  }

  /**
   * Lists the files and directories in a directory.
   */
  async *list(dirPath: string): AsyncIterable<HfsDirectoryEntry> {
    const parsed = parse(dirPath);
    console.log('*list', parsed);
    console.log('dirPath', dirPath);
    for await (const item of this.#root.ls(parsed.src)) {
      yield {
        name: item.name,
        size: item.type === 'file' ? Number(item.size) : 0,
        lastModified: new Date(),
        isFile: item.type === 'file',
        isSymlink: item.type === 'identity',
        isDirectory: item.type === 'directory',
      }
    }
  }

  /**
   * Returns the size of a file.
   */
  async size(filePath: string): Promise<number | undefined> {
    const {src} = parse(filePath);
    return this.#root
      .stat(src)
      // TODO: possibly refactor all types to use bigint
      .then(stat => Number(stat.fileSize))
      .catch((error: FSError) => {
        if (error.code === 'ENOENT')
          return undefined;
        throw error;
      });
  }

  /**
   * Returns the last modified date of a file or directory. This method handles ENOENT errors
   * and returns undefined in that case.
   */
  async lastModified(fileOrDirPath: string): Promise<Date | undefined> {
    const {src} = parse(fileOrDirPath);
    return this.#root
      .stat(src)
      .then(stat => new Date((stat.mtime?.nsecs ?? 0) * 1000))
      .catch((error: FSError) => {
        if (error.code === 'ENOENT')
          return undefined;
        throw error;
      });
  }

  /**
   * Copies a file from one location to another.
   * @throws {Error} If the source file does not exist.
   * @throws {Error} If the source file is a directory.
   * @throws {Error} If the destination file is a directory.
   */
  async copy(source: string, destination: string): Promise<void> {
    const {src, dest, name} = parse(source, destination);
    this.#root.cp(src, dest, name);
  }

  /**
   * Copies a file or directory from one location to another.
   * @throws {Error} If the source file or directory does not exist.
   * @throws {Error} If the destination file or directory is a directory.
   */
  async copyAll(source: string, destination: string): Promise<void> {
    const {src, dest, name} = parse(source, destination);
    this.#root.cp(src, dest, name);
  }

  /**
   * Moves a file from the source path to the destination path.
   * @throws {TypeError} If the file paths are not strings.
   * @throws {Error} If the file cannot be moved.
   */
  async move(source: string, destination: string): Promise<void> {
    const {src, dest, name} = parse(source, destination); 
    return this.#root.stat(src).then(stat => {
      if (stat.type === 'directory') {
        throw new Error(
          `EISDIR: illegal operation on a directory, move '${source}' -> '${destination}'`,
        );
      }
      this.#root.cp(src, dest, name);
    });
  }

  /**
   * Moves a file or directory from one location to another.
   * @throws {Error} If the source file or directory does not exist.
   */
  async moveAll(source: string, destination: string): Promise<void> {
    const {src, dest, name} = parse(source, destination); 
    this.#root.cp(src, dest, name);
  }
}

/**
 * A class representing a file system utility library.
 */
export class IpfsHfs extends Hfs implements HfsImpl {
  /**
   * Creates a new instance.
   */
  constructor({root}: {root: UnixFS}) {
    super({impl: new IpfsHfsImpl({root})});
  }
}

const helia = await createHelia({});

export default new IpfsHfs({
  root: unixfs(helia),
});

function parse(src: string, dest?: string) {
  const parts = new URL(src);
  const [cid, name] = parts.pathname.split('/') ?? [];
  return {
    src: CID.parse(cid),
    dest: CID.parse(dest || ''),
    parts,
    name,
  };
}

