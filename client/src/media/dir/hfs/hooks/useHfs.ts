import {useNavigate} from 'react-exo/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useCallback, useMemo, useEffect} from 'react';
import {useHfsCtx, useHfsWatch} from 'app/data/lib/hfs-provider';
import {getData} from 'media/file/utils/data';
import media from 'media/store';

import {isInitDirectory, INIT_DIRECTORIES} from '../utils/path';
import {saveAs} from '../utils/fs';

import type {GestureResponderEvent} from 'react-native';
import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsCtx} from '../types';

export function useHfs(path: string): HfsCtx {
  const [list, setList] = useState<HfsDirectoryEntry[]>([]);

  const hfs = useHfsCtx();
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
      // Check if path is valid
      if (!dirPath) return;
      // Check if directory exists
      if (!(await hfs?.isDirectory?.(dirPath))) return;
      // Get directory entries
      const list = hfs?.list?.(dirPath);
      for await (const entry of list ?? []) {
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
      return true;
    } catch (e) {
      console.warn('>> fs [refresh error]', path, e);
      return false;
    }
  }, [path, hfs]);

  const open = useCallback(async (entry: HfsDirectoryEntry) => {
    nav(path ? `${path}/${entry.name}` : entry.name);
  }, [path, nav]);

  const move = useCallback(async (from: HfsDirectoryEntry, to?: HfsDirectoryEntry) => {
    if (to) {
      await hfs?.move?.(from.name, to.name);
    } else {
      console.log('>> fs [move]', from);
    }
  }, [hfs]);

  const copy = useCallback(async (from: HfsDirectoryEntry, to?: HfsDirectoryEntry) => {
    if (to) {
      await hfs?.copy?.(from.name, to.name);
    } else {
      console.log('>> fs [copy]', from);
    }
  }, [hfs]);

  const rename = useCallback(async (entry: HfsDirectoryEntry, name?: string) => {
    if (name) {
      await hfs?.move?.(entry.name, name);
    } else {
      console.log('>> fs [rename]', entry);
    }
  }, [hfs]);

  const purge = useCallback(async (entry: HfsDirectoryEntry) => {
    await hfs?.deleteAll?.(entry.name);
  }, [hfs]);

  const select = useCallback((entry: HfsDirectoryEntry, event?: GestureResponderEvent) => {
    const [isShift, isCtrl] = [event?.shiftKey, event?.metaKey || event?.ctrlKey];
    const fullPath = path ? `${path}/${entry.name}` : entry.name;
    const isSelected = sel?.includes(fullPath);
    if (isShift && entry.isDirectory && (isSelected || sel?.length === 0)) {
      return open(entry);
    }
    put(media.actions.selectItem({
      path: fullPath,
      isRange: isShift ?? false,
      isMulti: isCtrl ?? false,
    }));
  }, [path, sel, open, put]);

  const upload = useCallback(async (entry: HfsDirectoryEntry, files: File[]) => {
    if (!hfs) return;
    for (const file of files) {
      const data = await file.arrayBuffer();
      await hfs?.write?.(
        `${entry.name}/${file.name}`,
        new Uint8Array(data),
      );
    }
  }, [hfs]);

  const download = useCallback(async (entry: HfsDirectoryEntry) => {
    if (entry.isFile) {
      const uri = path ? `${path}/${entry.name}` : entry.name;
      saveAs(await getData(uri, 'dataUrl'), entry.name);
    }
  }, [path]);

  const compress = useCallback(async (entry: HfsDirectoryEntry) => {
    console.log('>> fs [compress]', entry);
  }, []);

  const share = useCallback(async (entry: HfsDirectoryEntry) => {
    console.log('>> fs [share]', entry);
  }, []);

  // Update state with current files (for range-select)
  useEffect(() => {
    put(media.actions.list(list.map(e => path ? `${path}/${e.name}` : e.name)));
  }, [list, path, put]);

  // Create initial directories
  useEffect(() => {
    (async () => {
      if (!hfs) return;
      await Promise.all(INIT_DIRECTORIES.map(async (dir) => {
        if (!(await hfs.isDirectory?.(dir))) {
          await hfs.createDirectory?.(dir);
        }
      }));
    })();
  }, [hfs]);

  // Refresh entries on mount
  useEffect(() => {refresh()}, [path, refresh]);

  // Refresh entries on fs change
  useHfsWatch(path, refresh);

  return {
    ext,
    hfs: {
      list,
      path,
    },
    cmd: {
      open,
      move,
      copy,
      rename,
      purge,
      select,
      upload,
      download,
      compress,
      share,
    },
  };
}
