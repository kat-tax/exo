import {Hfs, Path, DirectoryError, NotFoundError, NotEmptyError} from '../core';
import type {HfsImpl, HfsDirectoryEntry} from '../core/types';

/**
 * A class representing the Origin Private File System implementation of Hfs.
 */
export class WebHfsImpl implements HfsImpl {
  /**
   * The root directory to work on.
   */
  #root: FileSystemDirectoryHandle;

  /**
   * Creates a new instance.
   */
  constructor({ root }: { root: FileSystemDirectoryHandle }) {
    if (!root) {
      throw new TypeError("options.root is required");
    }

    this.#root = root;
  }

  /**
   * Reads a file and returns the contents as an Uint8Array.
   */
  async bytes(filePath: string | URL): Promise<Uint8Array | undefined> {
    const buffer = await readFile(this.#root, filePath, "arrayBuffer") as ArrayBuffer | undefined;
    return buffer ? new Uint8Array(buffer) : undefined;
  }

  /**
   * Writes a value to a file. If the value is a string, UTF-8 encoding is used.
   */
  async write(filePath: string | URL, contents: Uint8Array): Promise<void> {
    let handle = await findPath(this.#root, filePath) as FileSystemFileHandle;

    if (!handle) {
      const path = Path.from(filePath);
      const name = path.name;
      const parentHandle = await findPath(this.#root, filePath, {
        create: true,
        kind: "directory",
        returnParent: true,
      }) as FileSystemDirectoryHandle ?? this.#root;
      handle = await parentHandle.getFileHandle(name, { create: true });
    }

    const writable = await handle.createWritable();
    await writable.write(contents);
    await writable.close();
  }

  /**
   * Appends a value to a file. If the value is a string, UTF-8 encoding is used.
   */
  async append(filePath: string | URL, contents: Uint8Array): Promise<void> {
    const handle = await findPath(this.#root, filePath) as FileSystemFileHandle;

    // if there's no existing file, just write the contents
    if (!handle) {
      return this.write(filePath, contents);
    }

    // can't write to a directory
    if (handle.kind !== "file") {
      throw new DirectoryError(`append '${filePath}'`);
    }

    const existing = await (await handle.getFile()).arrayBuffer();
    const newValue = new Uint8Array([
      ...new Uint8Array(existing),
      ...contents,
    ]);

    return this.write(filePath, newValue);
  }

  /**
   * Checks if a file exists.
   */
  async isFile(filePath: string | URL): Promise<boolean> {
    const handle = await findPath(this.#root, filePath);
    return !!(handle && handle.kind === "file");
  }

  /**
   * Checks if a directory exists.
   */
  async isDirectory(dirPath: string | URL): Promise<boolean> {
    const handle = await findPath(this.#root, dirPath);
    return !!(handle && handle.kind === "directory");
  }

  /**
   * Creates a directory recursively.
   */
  async createDirectory(dirPath: string | URL): Promise<void> {
    let handle = this.#root;
    const path = Path.from(dirPath);

    for (const name of path) {
      handle = await handle.getDirectoryHandle(name, { create: true });
    }
  }

  /**
   * Deletes a file or empty directory.
   */
  async delete(fileOrDirPath: string | URL): Promise<boolean> {
    const handle = await findPath(this.#root, fileOrDirPath);
    const parentHandle = await findPath(this.#root, fileOrDirPath, {
      returnParent: true,
    }) as FileSystemDirectoryHandle ?? this.#root;

    if (!handle) {
      return false;
    }

    // nonempty directories must not be deleted
    if (handle.kind === "directory") {
      // @ts-ignore -- TS doesn't know about this yet
      const entries = handle.values();
      const next = await entries.next();
      if (!next.done) {
        throw new NotEmptyError(`delete '${fileOrDirPath}'`);
      }
    }

    parentHandle.removeEntry(handle.name);
    return true;
  }

  /**
   * Deletes a file or directory recursively.
   */
  async deleteAll(fileOrDirPath: string | URL): Promise<boolean> {
    const handle = await findPath(this.#root, fileOrDirPath);

    if (!handle) {
      return false;
    }

    /*
     * Note: For some reason, Chromium is not respecting the
     * `recursive` option on `FileSystemDirectoryHandle.removeEntry()`.
     * I've been unable to come up with a minimal repro case to demonstrate.
     * Need to investigate further.
     * https://bugs.chromium.org/p/chromium/issues/detail?id=1521975
     */

    // @ts-ignore -- only supported by Chrome right now
    if (handle.remove) {
      // @ts-ignore -- only supported by Chrome right now
      await handle.remove({ recursive: true });
      return true;
    }

    const parentHandle = await findPath(this.#root, fileOrDirPath, {
      returnParent: true,
    }) as FileSystemDirectoryHandle ?? this.#root;

    if (!handle) {
      throw new NotFoundError(`deleteAll '${fileOrDirPath}'`);
    }
    parentHandle.removeEntry(handle.name, { recursive: true });
    return true;
  }

  /**
   * Returns a list of directory entries for the given path.
   */
  async *list(dirPath: string | URL): AsyncIterable<HfsDirectoryEntry> {
    const handle = await findPath(this.#root, dirPath) as FileSystemDirectoryHandle;

    if (!handle) {
      return;
    }

    // @ts-ignore -- TS doesn't know about this yet
    for await (const entry of handle.values()) {
      const isDirectory = entry.kind === "directory";
      const isFile = entry.kind === "file";

      yield {
        name: entry.name,
        isDirectory,
        isFile,
        isSymlink: false,
      };
    }
  }

  /**
   * Returns the size of a file.
   */
  async size(filePath: string | URL): Promise<number | undefined> {
    const handle = await findPath(this.#root, filePath);

    if (!handle || handle.kind !== "file") {
      return undefined;
    }

    const fileHandle = handle as FileSystemFileHandle;
    const file = await fileHandle.getFile();
    return file.size;
  }

  /**
   * Returns the last modified date of a file or directory. This method handles ENOENT errors
   * and returns undefined in that case.
   */
  async lastModified(fileOrDirPath: string | URL): Promise<Date | undefined> {
    const handle = await findPath(this.#root, fileOrDirPath);

    if (!handle) {
      return undefined;
    }

    if (handle.kind === "file") {
      const fileHandle = handle as FileSystemFileHandle;
      const file = await fileHandle.getFile();
      return new Date(file.lastModified);
    }

    /*
     * OPFS doesn't support last modified dates for directories, so we'll
     * check each entry to see what the most recent last modified date is.
     */
    let lastModified = new Date(0);

    // @ts-ignore -- TS doesn't know about this yet
    for await (const entry of this.list(fileOrDirPath)) {
      const entryPath = Path.from(fileOrDirPath);
      entryPath.push(entry.name);

      const date = await this.lastModified(entryPath.toString());
      if (date && date > lastModified) {
        lastModified = date;
      }
    }

    /*
     * Kind of messy -- if the last modified date is the one we set for
     * default, then we'll return a new Date() instead. This is because
     * we can't return undefined from this method when the directory is
     * found, and it also really doesn't matter when the directory is empty.
     */
    return lastModified.getTime() === 0 ? new Date() : lastModified;
  }

  /**
   * Copies a file from one location to another.
   */
  async copy(source: string | URL, destination: string | URL): Promise<void> {
    const fromHandle = await findPath(this.#root, source) as FileSystemFileHandle;

    if (!fromHandle) {
      throw new NotFoundError(`copy '${source}' -> '${destination}'`);
    }

    if (fromHandle.kind !== "file") {
      throw new DirectoryError(`copy '${source}' -> '${destination}'`);
    }

    if (await this.isDirectory(destination)) {
      throw new DirectoryError(`copy '${source}' -> '${destination}'`);
    }

    const toHandle = await findPath(this.#root, destination, {
      create: true,
      kind: "file",
    }) as FileSystemFileHandle;
    const file = await fromHandle.getFile();
    const writable = await toHandle.createWritable();
    await writable.write(file);
    await writable.close();
  }

  /**
   * Copies a file or directory from one location to another.
   */
  async copyAll(source: string | URL, destination: string | URL): Promise<void> {
    // for files use copy() and exit
    if (await this.isFile(source)) {
      return this.copy(source, destination);
    }

    // if the source isn't a directory then throw an error
    if (!(await this.isDirectory(source))) {
      throw new NotFoundError(`copyAll '${source}' -> '${destination}'`);
    }

    const sourcePath = Path.from(source);
    const destinationPath = Path.from(destination);

    // for directories, create the destination directory and copy each entry
    await this.createDirectory(destination);

    for await (const entry of this.list(source)) {
      destinationPath.push(entry.name);
      sourcePath.push(entry.name);

      if (entry.isDirectory) {
        await this.copyAll(
          sourcePath.toString(),
          destinationPath.toString(),
        );
      } else {
        await this.copy(
          sourcePath.toString(),
          destinationPath.toString(),
        );
      }

      destinationPath.pop();
      sourcePath.pop();
    }
  }

  /**
   * Moves a file from the source path to the destination path.
   */
  async move(source: string | URL, destination: string | URL): Promise<void> {
    const handle = await findPath(this.#root, source);

    if (!handle) {
      throw new NotFoundError(`move '${source}' -> '${destination}'`);
    }

    if (handle.kind !== "file") {
      throw new DirectoryError(`move '${source}' -> '${destination}'`);
    }

    const fileHandle = handle as FileSystemFileHandle;
    const destinationPath = Path.from(destination);
    const destinationName = destinationPath.pop();
    const destinationParent = await findPath(
      this.#root,
      destinationPath.toString(),
      { create: true, kind: "directory" },
    );

    const handleChromeError = async (ex: Error) => {
      if (ex.name === "NotAllowedError") {
        await this.copy(source, destination);
        await this.delete(source);
        return;
      }
      throw ex;
    };

    return (
      fileHandle
        // @ts-ignore -- TS doesn't know about this yet
        .move(destinationParent, destinationName)
        .catch(handleChromeError)
    );
  }

  /**
   * Moves a file or directory from one location to another.
   */
  async moveAll(source: string | URL, destination: string | URL): Promise<void> {
    const handle = await findPath(this.#root, source);

    // if the source doesn't exist then throw an error
    if (!handle) {
      throw new NotFoundError(`moveAll '${source}' -> '${destination}'`);
    }

    // for files use move() and exit
    if (handle.kind === "file") {
      return this.move(source, destination);
    }

    const directoryHandle = handle as FileSystemDirectoryHandle;
    const destinationPath = Path.from(destination);

    // Chrome doesn't yet support move() on directories
    // @ts-ignore -- TS doesn't know about this yet
    if (directoryHandle.move) {
      const destinationName = destinationPath.pop();
      const destinationParent = await findPath(
        this.#root,
        destinationPath.toString(),
        { create: true, kind: "directory" },
      );

      // @ts-ignore -- TS doesn't know about this yet
      return directoryHandle.move(destinationParent, destinationName);
    }

    const sourcePath = Path.from(source);

    // for directories, create the destination directory and move each entry
    await this.createDirectory(destination);

    for await (const entry of this.list(source)) {
      destinationPath.push(entry.name);
      sourcePath.push(entry.name);

      if (entry.isDirectory) {
        await this.moveAll(
          sourcePath.toString(),
          destinationPath.toString(),
        );
      } else {
        await this.move(
          sourcePath.toString(),
          destinationPath.toString(),
        );
      }

      destinationPath.pop();
      sourcePath.pop();
    }

    await this.delete(source);
  }
}

/**
 * A class representing a file system utility library.
 */
export class WebHfs extends Hfs {
  /** Creates a new instance. */
  constructor({root}: {root: FileSystemDirectoryHandle}) {
    super({impl: new WebHfsImpl({root})});
  }
}

export const hfs = new WebHfs({ root: await navigator.storage.getDirectory() });

/**
 * Finds a file or directory in the OPFS root.
 */
async function findPath(
  root: FileSystemDirectoryHandle,
  fileOrDirPath: string | URL,
  { returnParent = false, create = false, kind }: {
    returnParent?: boolean;
    create?: boolean;
    kind?: "file" | "directory";
  } = {},
): Promise<FileSystemHandle | undefined> {
  // Special case: "." means the root directory
  if (fileOrDirPath === ".") {
    return root;
  }

  const path = Path.from(fileOrDirPath);
  const steps = [...path];

  if (returnParent) {
    steps.pop();
  }

  let handle: FileSystemDirectoryHandle = root;
  let name = steps.shift();

  while (handle && name) {
    // `name` must represent a directory
    if (steps.length > 0) {
      try {
        handle = await handle.getDirectoryHandle(name, { create });
      } catch {
        return undefined;
      }
    } else {
      if (!kind) {
        try {
          return await handle.getDirectoryHandle(name, { create });
        } catch {
          try {
            return await handle.getFileHandle(name, { create });
          } catch {
            return undefined;
          }
        }
      }

      if (kind === "directory") {
        try {
          return await handle.getDirectoryHandle(name, { create });
        } catch {
          return undefined;
        }
      }

      if (kind === "file") {
        try {
          return await handle.getFileHandle(name, { create });
        } catch {
          return undefined;
        }
      }
    }

    name = steps.shift();
  }

  return undefined;
}

/**
 * Reads a file from the specified root.
 */
async function readFile(
  root: FileSystemDirectoryHandle,
  filePath: string | URL,
  dataType: "text" | "arrayBuffer"
): Promise<string | ArrayBuffer | undefined> {
  const handle = await findPath(root, filePath);

  if (!handle || handle.kind !== "file") {
    return undefined;
  }

  const fileHandle = handle as FileSystemFileHandle;
  const file = await fileHandle.getFile();

  if (dataType === "arrayBuffer") {
    return file.arrayBuffer();
  }

  return file.text();
}
