// TODO: replace with...
// https://github.com/RonRadtke/react-native-blob-util
// https://github.com/mrousavy/react-native-blob-jsi-helper
// https://github.com/craftzdog/react-native-quick-base64

import {Hfs} from '@humanfs/core';
import {Retrier} from '@humanwhocodes/retry';
import {FileSystem, Util} from 'react-native-file-access';

import type {HfsImpl, HfsDirectoryEntry} from '@humanfs/types';

const RETRY_ERROR_CODES = new Set(['ENFILE', 'EMFILE']);
type FSError = {code: string};

/**
 * A class representing React Native implementation of Hfs.
 */
export class NativeHfsImpl implements HfsImpl {
  /**
   * The file system module to use.
   */
  #root: typeof FileSystem;

  /**
   * The retryer object used for retrying operations.
   */
  #retrier: Retrier;

  /**
   * Creates a new instance.
   */
  constructor({root}: {root: typeof FileSystem}) {
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
    return this.#retrier
      .retry(() => this.#root.readFile(filePath))
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
      if (typeof contents === 'string') {
        this.#root.writeFile(filePath, contents);
      } else {
        // TODO: handle Uint8Array
        // https://github.com/alpha0010/react-native-file-access/issues/78
      }
    }

    return this.#retrier.retry(op).catch(async (error: FSError) => {
      if (error.code === 'ENOENT')
        return this.createDirectory(Util.dirname(filePath)).then(op);
      throw error;
    });
  }

  /**
   * Appends a value to a file. If the value is a string, UTF-8 encoding is used.
   * @throws {TypeError} If the file path is not a string.
   * @throws {Error} If the file cannot be appended to.
   */
  async append(filePath: string, contents: Uint8Array): Promise<void> {
    const op = () => {
      if (typeof contents === 'string') {
        this.#root.appendFile(filePath, contents);
      } else {
        // TODO: handle Uint8Array
        // https://github.com/alpha0010/react-native-file-access/issues/78
      }
    }

    return this.#retrier.retry(op).catch(async (error: FSError) => {
      if (error.code === 'ENOENT')
        return this.createDirectory(Util.dirname(filePath)).then(op);
      throw error;
    });
  }

  /**
   * Checks if a file exists.
   * @throws {Error} If the operation fails with a code other than ENOENT.
   */
  async isFile(filePath: string): Promise<boolean> {
    return this.#root
      .stat(filePath)
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
    return this.#root
      .stat(dirPath)
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
    await this.#root.mkdir(dirPath);
  }

  /**
   * Deletes a file or empty directory.
   * @throws {TypeError} If the file or directory path is not a string.
   * @throws {Error} If the file or directory cannot be deleted.
   */
  async delete(filePath: string): Promise<boolean> {
    return this.#root
      .unlink(filePath)
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
    return this.#root
      .unlink(filePath)
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
    const contents = await this.#root.ls(dirPath);
    // TODO: get stats
    yield* contents.map(name => ({
      name,
      isFile: false,
      isSymlink: false,
      isDirectory: false,
    }));
  }

  /**
   * Returns the size of a file.
   */
  async size(filePath: string): Promise<number | undefined> {
    return this.#root
      .stat(filePath)
      .then(stat => stat.size)
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
    return this.#root
      .stat(fileOrDirPath)
      .then(stat => new Date(stat.lastModified))
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
    return this.#root.cp(source, destination);
  }

  /**
   * Copies a file or directory from one location to another.
   * @throws {Error} If the source file or directory does not exist.
   * @throws {Error} If the destination file or directory is a directory.
   */
  async copyAll(source: string, destination: string): Promise<void> {
    return this.#root.cp(source, destination);
  }

  /**
   * Moves a file from the source path to the destination path.
   * @throws {TypeError} If the file paths are not strings.
   * @throws {Error} If the file cannot be moved.
   */
  async move(source: string, destination: string): Promise<void> {
    return this.#root.stat(source).then(stat => {
      if (stat.type === 'directory') {
        throw new Error(
          `EISDIR: illegal operation on a directory, move '${source}' -> '${destination}'`,
        );
      }
      return this.#root.mv(source, destination);
    });
  }

  /**
   * Moves a file or directory from one location to another.
   * @throws {Error} If the source file or directory does not exist.
   */
  async moveAll(source: string, destination: string): Promise<void> {
    return this.#root.mv(source, destination);
  }
}

/**
 * A class representing a file system utility library.
 */
export class NativeHfs extends Hfs implements HfsImpl {
  /**
   * Creates a new instance.
   */
  constructor({root}: {root: typeof FileSystem}) {
    super({impl: new NativeHfsImpl({root})});
  }
}

export default new NativeHfs({
  root: FileSystem,
});
