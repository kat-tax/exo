/**
 * Error thrown when a file or directory is not found.
 */
export class NotFoundError extends Error {
  name = 'NotFoundError';
  code = 'ENOENT';
  constructor(message: string) {
    super(`ENOENT: No such file or directory, ${message}`);
  }
}

/**
 * Error thrown when an operation is not permitted.
 */
export class PermissionError extends Error {
  name = 'PermissionError';
  code = 'EPERM';
  constructor(message: string) {
    super(`EPERM: Operation not permitted, ${message}`);
  }
}

/**
 * Error thrown when an operation is not allowed on a directory.
 */
export class DirectoryError extends Error {
  name = 'DirectoryError';
  code = 'EISDIR';
  constructor(message: string) {
    super(`EISDIR: Illegal operation on a directory, ${message}`);
  }
}

/**
 * Error thrown when a directory is not empty.
 */
export class NotEmptyError extends Error {
  name = 'NotEmptyError';
  code = 'ENOTEMPTY';
  constructor(message: string) {
    super(`ENOTEMPTY: Directory not empty, ${message}`);
  }
}
