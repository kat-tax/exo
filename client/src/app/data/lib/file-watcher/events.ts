type PathsListener = (paths: string[]) => void;

const listeners = new Set<PathsListener>();

export function subscribePaths(listener: PathsListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function emitPaths(paths: string[]): void {
  if (paths.length === 0) return;
  const unique = [...new Set(paths)];
  for (const listener of listeners) {
    listener(unique);
  }
}

