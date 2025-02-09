import {FS} from 'react-exo/fs';
import {observe, poll} from 'media/dir/utils/hfs/fs';
import {useContext, useEffect, useState, createContext} from 'react';

import type {HfsImpl, HfsType} from 'react-exo/fs';

const HfsContext = createContext<HfsContextType | null>(null);
const $ = new Map<string, {callbacks: Set<WatchFn>, disconnect: () => void}>();

export type WatchFn = () => void;

export interface HfsProviderProps {
  type?: HfsType;
}

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

export function HfsProvider({type, children}: React.PropsWithChildren<HfsProviderProps>) {
  const [fs, setFs] = useState<HfsImpl | null>(null);

  const register = async (path: string) => {
    const disconnect = await observe(path, () => {
      $.get(path)?.callbacks.forEach(c => c());
    });
    if (!disconnect) {
      let delta = 0;
      const interval = setInterval(async () => {
        if (await poll(path, delta)) {
          delta = Date.now();
          $.get(path)?.callbacks.forEach(c => c());
        }
      }, 200);
      console.warn('>> fs [polling]', path);
      return () => clearInterval(interval);
    }
    console.log('>> fs [observing]', path);
    return disconnect;
  };

  const watch = (path: string, fn: WatchFn) => {
    if (!$.has(path)) {
      $.set(path, {callbacks: new Set(), disconnect: () => {}});
      register(path).then(disconnect => {
        $.get(path)!.disconnect = disconnect;
      });
    }
    $.get(path)!.callbacks.add(fn);
    return () => {
      const {callbacks} = $.get(path)!;
      if (!callbacks) return;
      callbacks.delete(fn);
      if (callbacks.size === 0) {
        $.get(path)?.disconnect();
        $.delete(path);
      }
    };
  };

  useEffect(() => {(async () =>
    setFs(await FS.init(type)))();
  }, []);

  return (
    <HfsContext.Provider value={{fs, watch}}>
      {children}
    </HfsContext.Provider>
  );
}
