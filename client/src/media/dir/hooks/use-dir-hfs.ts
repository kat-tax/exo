import {setFocus} from '@noriginmedia/norigin-spatial-navigation';
import {useState, useCallback, useMemo, useEffect, useRef} from 'react';
import {useHfs, useHfsWatch} from 'app/data/lib/hfs';
import {useSet, useGet} from 'app/data';
import {useNav} from 'app/nav/hooks';
import {isZeego} from 'app/ui/float';
import {getData} from 'media/file/utils/data';
import {device} from 'app/data/lib/device';
import media from 'media/store';
import cfg from 'config';
import * as _ from 'app/lib/dragdrop';

import {INIT_DIRECTORIES} from '../utils/hfs/path';
import {getThumbnail} from '../utils/hfs/meta';
import {saveAs} from '../utils/hfs/fs';

import type {HfsCtx, HfsFileEntry} from 'media/dir/types/hfs';
import type {GestureResponderEvent} from 'react-native';
import type {CleanupFn} from 'app/lib/dragdrop';
import type * as RN from 'react-native';

export function useDirHfs(path: string, tmp?: boolean): Omit<HfsCtx, 'bar'> {
  const [list, setList] = useState<HfsFileEntry[]>([]);
  const [dropping, setDropping] = useState(false);
  const refDnd = useRef<RN.View>(null);
  const nav = useNav();
  const hfs = useHfs();
  const sel = useGet(media.selectors.getSelected);
  const dnd = useGet(media.selectors.getDragging);
  const rnm = useGet(media.selectors.getRenaming);
  const ext = useMemo(() => ({sel, dnd, rnm, tmp}), [sel, dnd, rnm, tmp]);
  const set = useSet();

  const goUp = useCallback(() => {
    // Navigate to device overview (+ focus local device)
    if (!path) {
      nav.push('MediaBrowseDevices');
      setFocus(`device-${device.id}`)
      return false;
    }
    // Navigate to parent directory
    const parent = path.split('/').slice(0, -1).join('/');
    nav.push('MediaBrowseLocal', {path: parent});
    setFocus('list-0');
    return true;
  }, [path, nav]);

  const refresh = useCallback(async (): Promise<boolean> => {
    const showHidden = true;
    const entries: HfsFileEntry[] = [];
    const dirPath = path || '.';
    try {
      // Check if path is valid
      if (!dirPath) return false;
      // Check if directory exists
      if (!(await hfs?.isDirectory?.(dirPath))) return false;
      // Get directory entries
      const list = hfs?.list?.(dirPath);
      for await (const entry of list ?? []) {
        // Special files
        if (entry.name.endsWith('.crswap'))
          continue;
        // Special directories
        if (entry.name === '.tmp')
          continue;
        // Hidden files
        if (entry.name.startsWith('.') && !showHidden)
          continue;
        // Database files
        if (dirPath === '.' && entry.name === `.${cfg.APP_NAME}-${cfg.STORE_VERSION}`)
          continue;
        // Initial directories
        // if (dirPath === '.' && isInitDirectory(entry.name))
        //   continue;
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
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      }));
      return true;
    } catch (e) {
      console.warn('>> fs [refresh error]', path, e);
      return false;
    }
  }, [hfs, path]);

  const open = useCallback(async (entry: HfsFileEntry, clearSel?: boolean) => {
    if (!entry.isDirectory) return;
    const newPath = path ? `${path}/${entry.name}` : entry.name;
    nav.push('MediaBrowseLocal', {path: newPath});
    setFocus('list-0');
    if (clearSel) set(media.actions.selectBulk([]));
  }, [path, nav, set]);

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

  const rename = useCallback(async (entry: HfsFileEntry, name?: string | null) => {
    // Null provided, cancel rename
    if (name === null) {
      set(media.actions.rename([]));
      return;
    }
    // Undefined provided, start rename mode
    if (name === undefined) {
      const fullPath = path ? `${path}/${entry.name}` : entry.name;
      set(media.actions.rename([fullPath]));
    // String provided - perform rename
    } else {
      if (name && name !== entry.name) {
        const base = path ? `${path}/` : '';
        const oldPath = `${base}${entry.name}`;
        const newPath = `${base}${name}`;
        await hfs?.moveAll?.(oldPath, newPath);
      }
      set(media.actions.rename([]));
    }
  }, [hfs, path, set]);

  const select = useCallback((entry: HfsFileEntry, event?: GestureResponderEvent) => {
    if (isZeego(event)) return;
    const [isShift, isCtrl] = [event?.shiftKey, event?.metaKey || event?.ctrlKey];
    const fullPath = path ? `${path}/${entry.name}` : entry.name;
    const isSelected = sel?.includes(fullPath);
    if (isShift && entry.isDirectory && (isSelected || sel?.length === 0)) {
      return open(entry);
    }
    set(media.actions.selectItem({
      path: fullPath,
      isRange: isShift ?? false,
      isMulti: isCtrl ?? false,
      list: list.map(e => path ? `${path}/${e.name}` : e.name),
    }));
  }, [path, list, sel, open, set]);

  const upload = useCallback(async (entry: HfsFileEntry, files: File[]) => {
    if (!hfs) return;
    for (const file of files) {
      const data = await file.arrayBuffer();
      const relPath = file.webkitRelativePath
        // @ts-expect-error TS missing types
        || file.relativePath
        // @ts-expect-error TS missing types
        || file.dndRelativePath;
      const targetPath = relPath
        ? `${entry.name}/${relPath}`
        : entry.name;
      await hfs?.write?.(
        `${targetPath}/${file.name}`,
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

  // Drag and drop files to the directory
  useEffect(() => {
    if (!refDnd.current) return;
    const element = refDnd.current as unknown as HTMLElement;
    const entry: HfsFileEntry = {
      name: path || '.',
      size: 0,
      isFile: false,
      isSymlink: false,
      isDirectory: true,
      lastModified: new Date(),
    };
    return _.combine(...[
      _.dropTargetForExternal({
        element,
        canDrop: _.containsFiles,
        getDropEffect: () => 'copy',
        onDragEnter: () => setDropping(true),
        onDragLeave: () => setDropping(false),
        onDropTargetChange: ({location, self}) => {
          setDropping(location.current.dropTargets[0]?.element === self.element);
        },
        onDrop: async ({location, self, source}) => {
          if (location.current.dropTargets[0]?.element !== self.element) return;
          setDropping(false);
          _.droppedFiles(source, async (files) => {
            if (files.length) {
              await upload(entry, files);
              refresh();
            }
          });
        },
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [path, hfs, move, refresh]);

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
    dir: {
      list,
      path,
    },
    opt: {
      dropping,
    },
    refs: [
      refDnd,
    ],
    cmd: {
      goUp,
      refresh,
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
