import {useNavigate} from 'react-exo/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useCallback, useMemo, useEffect} from 'react';
import {useHfs, useHfsWatch} from 'app/data/lib/hfs-provider';
import {getData} from 'media/file/utils/data';
import media from 'media/store';

import {isInitDirectory, INIT_DIRECTORIES} from '../utils/hfs/path';
import {saveAs} from '../utils/hfs/fs';

import type {GestureResponderEvent} from 'react-native';
import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsCtx} from 'media/dir/types/hfs';

export function useDirHfs(path: string, tmp?: boolean): Omit<HfsCtx, 'bar'> {
  const [list, setList] = useState<HfsDirectoryEntry[]>([]);

  const hfs = useHfs();
  const sel = useSelector(media.selectors.getSelected);
  const dnd = useSelector(media.selectors.getDragging);
  const ext = useMemo(() => ({sel, dnd, tmp}), [sel, dnd, tmp]);

  const put = useDispatch();
  const nav = useNavigate();

  const goUp = useCallback(() => {
    if (!path) return false;
    const parent = path.split('/').slice(0, -1).join('/');
    nav(parent);
    return true;
  }, [path, nav]);

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
  }, [hfs, path]);

  const open = useCallback(async (entry: HfsDirectoryEntry, clearSel?: boolean) => {
    if (!entry.isDirectory) return;
    nav(path ? `${path}/${entry.name}` : entry.name);
    if (clearSel) put(media.actions.selectBulk([]));
  }, [path, nav, put]);

  const move = useCallback(async (from: HfsDirectoryEntry, to?: HfsDirectoryEntry) => {
    if (to) {
      const base = path ? `${path}/` : '';
      const src = `${base}${from.name}`;
      const dest = `${base}${to.name ?? ''}/${from.name}`;
      console.log('>> fs [move]', src, '->', dest);
      await hfs?.moveAll?.(src, dest);
    } else {
      console.log('>> fs [move]', from);
    }
  }, [hfs, path]);

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
    const base = path ? `${path}/` : '';
    const uri = `${base}${entry.name}`;
    await hfs?.deleteAll?.(uri);
  }, [hfs, path]);

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
  // biome-ignore lint/correctness/useExhaustiveDependencies: path explicit
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
      goUp,
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
