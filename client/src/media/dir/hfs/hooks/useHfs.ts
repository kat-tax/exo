import {FS} from 'react-exo/fs';
import {useState, useCallback, useMemo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-exo/navigation';

import {isInitDirectory, INIT_DIRECTORIES} from '../utils/path';
import {observe, poll, saveAs} from '../utils/fs';
import {getData} from 'media/file/utils/data';
import media from 'media/store';

import type {GestureResponderEvent} from 'react-native';
import type {HfsImpl, HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsCtx} from '../types';

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

  const open = useCallback(async (entry: HfsDirectoryEntry) => {
    nav(path ? `${path}/${entry.name}` : entry.name);
  }, [path, nav]);

  const move = useCallback(async (from: HfsDirectoryEntry, to?: HfsDirectoryEntry) => {
    if (to) {
      await filesystem?.move?.(from.name, to.name);
    } else {
      console.log('>> fs [move]', from);
    }
  }, [filesystem]);

  const copy = useCallback(async (from: HfsDirectoryEntry, to?: HfsDirectoryEntry) => {
    if (to) {
      await filesystem?.copy?.(from.name, to.name);
    } else {
      console.log('>> fs [copy]', from);
    }
  }, [filesystem]);

  const rename = useCallback(async (entry: HfsDirectoryEntry, name?: string) => {
    if (name) {
      await filesystem?.move?.(entry.name, name);
    } else {
      console.log('>> fs [rename]', entry);
    }
  }, [filesystem]);

  const purge = useCallback(async (entry: HfsDirectoryEntry) => {
    await filesystem?.deleteAll?.(entry.name);
  }, [filesystem]);

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

  // Mount filesystem
  useEffect(() => {
    (async () => setFilesystem(await FS.init('fs')))();
  }, []);

  // Update state with current files (for range-select)
  useEffect(() => {
    put(media.actions.list(list.map(e => path ? `${path}/${e.name}` : e.name)));
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
