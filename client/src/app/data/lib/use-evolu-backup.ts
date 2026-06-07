import { useCallback, useEffect, useRef, useState } from 'react';
import { startEvoluBackup } from './evolu-backup';
import type { BackupOptions } from './evolu-backup';
import type { Evolu } from "@evolu/common";

type BackupStatus = 'idle' | 'picking' | 'active' | 'error';

export interface UseEvoluBackupOptions extends BackupOptions {
  /**
   * When false, the hook is a no-op and returns idle state.
   * Usually for web platform and dev mode checks.
   */
  enabled?: boolean;
  /**
   * Keyboard shortcut that toggles the backup (e.g. 'ctrl+shift+b').
   * When provided, the backup does NOT start automatically on mount —
   * the hotkey is the only trigger. When omitted, the backup starts
   * automatically on mount.
   */
  hotkey?: string;
  /** Called when the backup is activated via the hotkey. */
  onStart?: () => void;
  /** Called when the backup is deactivated via the hotkey. */
  onStop?: () => void;
}

/**
 * Hook to manage the backup of an Evolu database.
 * @param evolu - The Evolu database instance.
 * @param options - The options for the backup.
 * @returns The backup status, error, start, stop, toggle.
 */
export function useEvoluBackup(evolu: Evolu<any>, options: UseEvoluBackupOptions = {}) {
  const [status, setStatus] = useState<BackupStatus>('idle');
  const [error, setError] = useState<unknown>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const {
    enabled = true,
    hotkey,
    intervalMs,
    checkHash,
    suggestedName,
    onWrite,
    onError,
    onStart,
    onStop,
  } = options;

  const onWriteRef = useRef(onWrite);
  const onErrorRef = useRef(onError);
  const onStartRef = useRef(onStart);
  const onStopRef = useRef(onStop);
  onWriteRef.current = onWrite;
  onErrorRef.current = onError;
  onStartRef.current = onStart;
  onStopRef.current = onStop;

  const start = useCallback(async () => {
    if (!enabled) return;
    if (stopRef.current) return;
    setStatus('picking');
    setError(null);
    try {
      const stop = await startEvoluBackup(evolu, {
        suggestedName,
        intervalMs,
        checkHash,
        onWrite: (bytes) => {
          onWriteRef.current?.(bytes);
        },
        onError: (err) => {
          setError(err);
          setStatus('error');
          onErrorRef.current?.(err);
        },
      });
      stopRef.current = stop;
      setStatus('active');
    } catch (err) {
      setError(err);
      setStatus('idle');
    }
  }, [evolu, enabled, intervalMs, suggestedName, onWriteRef, onErrorRef]);

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    setStatus('idle');
  }, []);

  const toggle = useCallback(async () => {
    if (stopRef.current) {
      stop();
      onStopRef.current?.();
    } else {
      await start();
      onStartRef.current?.();
    }
  }, [start, stop]);

  // Automatically start the backup if the hotkey is not provided
  useEffect(() => {
    if (enabled && !hotkey) {
      start();
    }
    return () => {
      stopRef.current?.();
      stopRef.current = null;
    };
  }, [enabled, hotkey, start]);

  // Register the hotkey combo on mount and cleanup on unmount
  useEffect(() => {
    if (!hotkey || !enabled) return;
    const parsed = parseHotkey(hotkey);
    const handler = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === parsed.key &&
        e.ctrlKey === parsed.ctrl &&
        e.shiftKey === parsed.shift &&
        e.altKey === parsed.alt &&
        e.metaKey === parsed.meta
      ) {
        e.preventDefault();
        void toggle();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hotkey, enabled, toggle]);

  if (!enabled) {
    return {
      status: 'idle' as const,
      error: null,
      toggle: () => {},
      start: () => {},
      stop: () => {},
    };
  }

  return {
    status,
    error,
    toggle,
    start,
    stop,
  };
}

/**
 * Parse a hotkey string like "ctrl+shift+d" into modifier flags
 * @example parseHotkey('ctrl+shift+d') => { key: 'd', ctrl: true, shift: true, meta: false, alt: false }
 */
function parseHotkey(hotkey: string): {
  key: string;
  ctrl: boolean;
  shift: boolean;
  meta: boolean;
  alt: boolean;
} {
  const parts = hotkey.toLowerCase().split('+');
  const key = parts[parts.length - 1];
  return {
    key,
    ctrl: parts.includes('ctrl'),
    shift: parts.includes('shift'),
    meta: parts.includes('meta') || parts.includes('cmd'),
    alt: parts.includes('alt'),
  };
}
