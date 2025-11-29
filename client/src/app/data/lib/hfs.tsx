import {FS} from 'react-exo/fs';
import {createContext, useContext, useEffect, useState} from 'react';
import {subscribePaths} from 'app/data/lib/file-watcher/events';

import type {HfsImpl} from 'react-exo/fs';

const ROOT_PATH = '';
const HfsContext = createContext<HfsContextType | null>(null);
const watchers = new Map<string, Set<WatchFn>>();

export type WatchFn = () => void;

export interface HfsContextType {
  fs: HfsImpl | null;
  watch: (path: string, fn: WatchFn) => () => void;
}

function normalizePath(path: string): string {
  if (!path)
    return ROOT_PATH;
  const cleaned = path
    .replace(/\\/g, '/')
    .replace(/^\.\/+/, '')
    .replace(/\/{2,}/g, '/')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
  if (cleaned === '.' || cleaned === '')
    return ROOT_PATH;
  return cleaned;
}

function collectRelevantPaths(path: string): string[] {
  const normalized = normalizePath(path);
  const targets = new Set<string>();
  if (normalized) {
    targets.add(normalized);
    const segments = normalized.split('/');
    for (let i = segments.length - 1; i >= 1; i--) {
      targets.add(segments.slice(0, i).join('/'));
    }
  }
  targets.add(ROOT_PATH);
  return [...targets];
}

function notifyWatchers(paths: string[]): void {
  if (!paths.length || watchers.size === 0) return;
  const notified = new Set<WatchFn>();
  for (const path of paths) {
    for (const key of collectRelevantPaths(path)) {
      const callbacks = watchers.get(key);
      if (!callbacks) continue;
      for (const cb of callbacks) {
        if (notified.has(cb)) continue;
        notified.add(cb);
        cb();
      }
    }
  }
}

export function useHfs() {
  const ctx = useContext(HfsContext);
  if (!ctx) throw new Error('useHfs must be used within a HfsProvider');
  return ctx.fs;
}

export function useHfsWatch(path: string, fn: WatchFn) {
  const ctx = useContext(HfsContext);
  if (!ctx) throw new Error('useHfsWatch must be used within a HfsProvider');
  useEffect(() => ctx.watch(path, fn), [path, fn, ctx]);
}

export function HfsProvider({children}: React.PropsWithChildren) {
  const [fs, setFs] = useState<HfsImpl | null>(null);

  const watch = (path: string, fn: WatchFn) => {
    const normalizedPath = normalizePath(path);
    if (!watchers.has(normalizedPath))
      watchers.set(normalizedPath, new Set());
    watchers.get(normalizedPath)?.add(fn);
    return () => {
      const callbacks = watchers.get(normalizedPath);
      if (!callbacks) return;
      callbacks.delete(fn);
      if (callbacks.size === 0) {
        watchers.delete(normalizedPath);
      }
    };
  };

  useEffect(() => {
    (async () => {
      setFs(await FS.init('local'));
    })();
  }, []);

  useEffect(() => {
    return subscribePaths(notifyWatchers);
  }, []);

  return (
    <HfsContext.Provider value={{fs, watch}}>
      {children}
    </HfsContext.Provider>
  );
}
