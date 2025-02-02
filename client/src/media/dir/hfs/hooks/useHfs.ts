import {FS} from 'react-exo/fs';
import {useState, useCallback, useMemo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-exo/navigation';

import {isInitDirectory, INIT_DIRECTORIES} from '../utils/path';
import {observe, poll, saveAs} from '../utils/fs';
import {getData} from 'media/file/utils/data';
import media from 'media/store';

import type {HfsCtx} from '../types';
import type {HfsImpl, HfsDirectoryEntry} from 'react-exo/fs';
import type {GestureResponderEvent} from 'react-native';

export function useHfs(path: string): HfsCtx {
  const [filesystem, setFilesystem] = useState<HfsImpl | null>(null);
  const [list, setList] = useState<HfsDirectoryEntry[]>([]);
  const sel = useSelector(media.selectors.getSelected);
  const dnd = useSelector(media.selectors.getDragging);
  const ext = useMemo(() => ({sel, dnd}), [sel, dnd]);

  const put = useDispatch();
  const nav = useNavigate();

  const refresh = useCallback(async () => {
    const showHidden = true;
    const entries: HfsDirectoryEntry[] = [];
    const dirPath = path || '.';
    try {
      for await (const entry of filesystem?.list?.(dirPath) ?? []) {
        // Special files
        if (entry.name.endsWith('.crswap'))
          continue;
        // Special directories
        if (entry.name === '.db' || entry.name === '.tmp')
          continue;
        // Hidden files
        if (entry.name.startsWith('.') && !showHidden)
          continue;
        // Initial directories
        if (dirPath === '.' && isInitDirectory(entry.name))
          continue;
        entries.push(entry);
      }
    } catch (e) {
      console.error('>> fs [list]', e);
    }
    setList(entries.sort((a, b) => {
      if (a.name.startsWith('.') && !showHidden)
        return 1;
      if (b.name.startsWith('.') && !showHidden)
        return -1;
      if (a.isDirectory && !b.isDirectory)
        return -1;
      if (!a.isDirectory && b.isDirectory)
        return 1;
      return a.name.localeCompare(b.name);
    }));
  }, [path, filesystem]);

  const move = useCallback(async (from: HfsDirectoryEntry, to: HfsDirectoryEntry) => {
    await filesystem?.move?.(from.name, to.name);
  }, [filesystem]);

  const purge = useCallback(async (entry: HfsDirectoryEntry) => {
    await filesystem?.deleteAll?.(entry.name);
  }, [filesystem]);

  const select = useCallback((entry: HfsDirectoryEntry, e?: GestureResponderEvent) => {
    // @ts-expect-error RNW property
    const [isRange, isMulti] = [e?.shiftKey, e?.metaKey || e?.ctrlKey];
    const fullPath = path ? `${path}/${entry.name}` : entry.name;
    if (entry.isFile) {
      put(media.actions.selectItem({path: fullPath, isMulti, isRange}));
    } else {
      nav(fullPath);
    }
  }, [path, nav, put]);

  const upload = useCallback(async (entry: HfsDirectoryEntry, files: File[]) => {
    if (!filesystem) return;
    for (const file of files) {
      const data = await file.arrayBuffer();
      await filesystem?.write?.(
        `${entry.name}/${file.name}`,
        new Uint8Array(data),
      );
    }
  }, [filesystem]);

  const download = useCallback(async (entry: HfsDirectoryEntry) => {
    if (entry.isFile) {
      saveAs(await getData(path, 'dataUrl'), entry.name);
    }
  }, [path]);

  // Mount filesystem
  useEffect(() => {
    (async () => setFilesystem(await FS.init('fs')))();
  }, []);

  // Update state with current files (for range-select)
  useEffect(() => {
    put(media.actions.list(list
      .filter(e => !e.isDirectory)
      .map(e => path ? `${path}/${e.name}` : e.name)));
  }, [list, path, put]);

  // Refresh entries on mount
  useEffect(() => {
    refresh();
    let _disconnect = () => {};
    try {
      observe(path, refresh).then(disconnect => {
        if (!disconnect) {
          let delta = 0;
          console.warn('>> fs [polling]', path);
          const i = setInterval(async () => {
            if (await poll(path, delta)) {
              delta = Date.now();
              refresh();
            }
          }, 200);
          _disconnect = () => clearInterval(i);
        } else {
          _disconnect = disconnect;
        }
      });
    } catch (e) {
      console.error('>> fs [observe]', e);
    }
    return _disconnect;
  }, [path, refresh]);

  // Create initial directories
  useEffect(() => {
    (async () => {
      if (!filesystem) return;
      await Promise.all(INIT_DIRECTORIES.map(async (dir) => {
        if (!(await filesystem.isDirectory?.(dir))) {
          await filesystem.createDirectory?.(dir);
        }
      }));
    })();
  }, [filesystem]);

  return {
    hfs: {list, path},
    cmd: {move, purge, select, upload, download},
    ext,
  };
}
