import {useNavigate} from 'react-exo/navigation';
import {useState, useCallback, useMemo, useEffect} from 'react';
import {useHfs, useHfsWatch} from 'app/data/lib/hfs-provider';
import {usePut, useGet} from 'app/data/store';
import {isZeego} from 'app/stacks/float/menu-context';
import {getData} from 'media/file/utils/data';
import media from 'media/store';

import {isInitDirectory, INIT_DIRECTORIES} from '../utils/hfs/path';
import {getThumbnail} from '../utils/hfs/meta';
import {saveAs} from '../utils/hfs/fs';

import type {GestureResponderEvent} from 'react-native';
import type {HfsCtx, HfsFileEntry} from 'media/dir/types/hfs';

export function useDirHfs(path: string, tmp?: boolean): Omit<HfsCtx, 'bar'> {
  const [list, setList] = useState<HfsFileEntry[]>([]);

  const hfs = useHfs();
  const sel = useGet(media.selectors.getSelected);
  const dnd = useGet(media.selectors.getDragging);
  const ext = useMemo(() => ({sel, dnd, tmp}), [sel, dnd, tmp]);

  const put = usePut();
  const nav = useNavigate();

  const goUp = useCallback(() => {
    if (!path) return false;
    const parent = path.split('/').slice(0, -1).join('/');
    nav(parent);
    return true;
  }, [path, nav]);

  const refresh = useCallback(async () => {
    const showHidden = true;
    const entries: HfsFileEntry[] = [];
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

  const open = useCallback(async (entry: HfsFileEntry, clearSel?: boolean) => {
    if (!entry.isDirectory) return;
    nav(path ? `${path}/${entry.name}` : entry.name);
    if (clearSel) put(media.actions.selectBulk([]));
  }, [path, nav, put]);

  const move = useCallback(async (from: HfsFileEntry, to?: HfsFileEntry) => {
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

  const copy = useCallback(async (from: HfsFileEntry, to?: HfsFileEntry) => {
    if (to) {
      await hfs?.copy?.(from.name, to.name);
    } else {
      console.log('>> fs [copy]', from);
    }
  }, [hfs]);
  
  const purge = useCallback(async (entry: HfsFileEntry) => {
    const base = path ? `${path}/` : '';
    const uri = `${base}${entry.name}`;
    await hfs?.deleteAll?.(uri);
  }, [hfs, path]);

  const rename = useCallback(async (entry: HfsFileEntry, name?: string) => {
    if (name) {
      await hfs?.move?.(entry.name, name);
    } else {
      console.log('>> fs [rename]', entry);
    }
  }, [hfs]);
  
  const select = useCallback((entry: HfsFileEntry, event?: GestureResponderEvent) => {
    if (isZeego(event)) return;
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
      namespace: tmp ? 'temp' : 'main',
    }));
  }, [path, tmp, sel, open, put]);

  const upload = useCallback(async (entry: HfsFileEntry, files: File[]) => {
    if (!hfs) return;
    for (const file of files) {
      const data = await file.arrayBuffer();
      await hfs?.write?.(
        `${entry.name}/${file.name}`,
        new Uint8Array(data),
      );
    }
  }, [hfs]);

  const download = useCallback(async (entry: HfsFileEntry) => {
    if (entry.isFile) {
      const uri = path ? `${path}/${entry.name}` : entry.name;
      saveAs(await getData(uri, 'dataUrl'), entry.name);
    }
  }, [path]);

  const compress = useCallback(async (entry: HfsFileEntry) => {
    console.log('>> fs [compress]', entry);
  }, []);

  const thumbnail = useCallback(async (entry: HfsFileEntry) => {
    return getThumbnail(path, entry);
  }, [path]);

  const share = useCallback(async (entry: HfsFileEntry) => {
    console.log('>> fs [share]', entry);
  }, []);

  // Update state with current files (for range-select)
  useEffect(() => {
    put(media.actions.list({
      list: tmp ? 'temp' : 'main',
      items: list.map(e => path ? `${path}/${e.name}` : e.name),
    }));
  }, [list, path, put, tmp]);

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
      share,
      open,
      move,
      copy,
      purge,
      rename,
      select,
      upload,
      download,
      compress,
      thumbnail,
    },
  };
}
