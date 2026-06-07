/**
 * Get the path info for a file.
 * @param name - The name of the file.
 * @param isDir - Whether the file is a directory (optional, defaults to false).
 * @returns The path info.
 */
export function getPathInfo(name: string, isDir: boolean = false): {
  ext: string;
  name: string;
  isDir: boolean;
} {
  const dot = isDir ? -1 : name.lastIndexOf('.') ?? -1;
  return {
    ext: dot !== -1 ? name.slice(dot + 1) : '',
    name: dot !== -1 ? name.slice(0, dot) : name,
    isDir: isDir ?? false,
  };
}

/**
 * Get the target path for a file.
 * @param srcPath - The source path.
 * @param fileName - The name of the file.
 * @param targetDir - The target directory (optional, defaults to the source path parent directory)
 * @returns The target path.
 */
export function getTargetPath(
  srcPath: string,
  fileName: string,
  targetDir?: string,
): string {
  // Root directory (context based on path)
  const rootDirectory = srcPath.includes('/') ? srcPath.split('/').slice(0, -1).join('/') + '/' : '';
  // Target directory to extract to
  const targetDirectory = targetDir ? `${rootDirectory}${targetDir}/` : rootDirectory;
  // Destination file path
  return `${targetDirectory}${fileName}`;
}
