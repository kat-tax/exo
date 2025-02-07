import {FS} from 'react-exo/fs';
import {observe, poll} from 'media/dir/hfs/utils/fs';
import {useContext, useEffect, useRef, useState, createContext} from 'react';

import type {HfsImpl} from 'react-exo/fs';

const HfsContext = createContext<HfsContextType | null>(null);

export type WatchFn = () => void;

export interface HfsContextType {
  fs: HfsImpl | null;
  watch: (path: string, fn: WatchFn) => () => void;
}

export function useHfsCtx() {
  const ctx = useContext(HfsContext);
  if (!ctx) throw new Error('useHfsCtx must be used within a HfsProvider');
  return ctx.fs;
}

export function useHfsWatch(path: string, fn: WatchFn) {
  const ctx = useContext(HfsContext);
  if (!ctx) throw new Error('useHfsWatch must be used within a HfsProvider');
  useEffect(() => ctx.watch(path, fn), [path, fn, ctx]);
}

export function HfsProvider({children}: React.PropsWithChildren) {
  const [fs, setFs] = useState<HfsImpl | null>(null);
  const refWatchPath = useRef<Map<string, Set<WatchFn>>>(new Map());
  const refDisconnect = useRef<Map<string, () => void>>(new Map());

  const register = async (path: string) => {
    try {
      console.log('>> fs [observer created]', path);
      const disconnect = await observe(path, () => {
        refWatchPath.current.get(path)?.forEach(c => c());
      });
      if (!disconnect) {
        console.warn('>> fs [polling]', path);
        let delta = 0;
        const interval = setInterval(async () => {
          if (await poll(path, delta)) {
            delta = Date.now();
            refWatchPath.current.get(path)?.forEach(c => c());
          }
        }, 200);
        return () => clearInterval(interval);
      }
      return disconnect;
    } catch (e) {
      console.error('>> fs [observe]', path, e);
      return () => {};
    }
  };

  const watch = (path: string, fn: WatchFn) => {
    const watchers = refWatchPath.current;
    if (!watchers.has(path)) {
      watchers.set(path, new Set());
      register(path).then(disconnect => {
        refDisconnect.current.set(path, disconnect);
      });
    }
    watchers.get(path)?.add(fn);
    return () => {
      const fns = watchers.get(path);
      fns?.delete(fn);
      if (fns?.size === 0) {
        watchers.delete(path);
        try {
          refDisconnect.current.get(path)?.();
          refDisconnect.current.delete(path);
        } catch (e) {
          console.error('>> fs [disconnect]', path, e);
        }
      }
    };
  };

  useEffect(() => {(async () =>
    setFs(await FS.init('fs')))();
  }, []);

  return (
    <HfsContext.Provider value={{fs, watch}}>
      {children}
    </HfsContext.Provider>
  );
}
