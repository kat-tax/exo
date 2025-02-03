import {useDispatch} from 'react-redux';
import {useRef, useState, useEffect} from 'react';
import {toPathInfo} from 'app/utils/formatting';
import * as dnd from 'app/utils/dragdrop';
import media from 'media/store';

import {isZipData} from 'media/dir/zip/hooks/useZipEntry';
import {isTorrentData} from 'media/dir/torrent/hooks/useTorrentEntry';

import type {View} from 'react-native';
import type {CleanupFn} from 'app/utils/dragdrop';
import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsEntryProps} from '../stacks/HfsEntry';

export function useHfsEntry({entry, cmd, opt}: HfsEntryProps) {
  const [dropping, setDropping] = useState(false);
  const ext = toPathInfo(entry.name, entry.isDirectory)?.ext;
  const ref = useRef<View>(null);
  const put = useDispatch();

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as unknown as HTMLElement;
    return dnd.combine(...[
      dnd.draggable({
        element,
        getInitialData: () => getHfsData(entry),
        onGenerateDragPreview: ({nativeSetDragImage}) => dnd.dragPreview(nativeSetDragImage),
        onDragStart: () => put(media.actions.drag(entry.name)),
        onDrop: () => put(media.actions.drag(null)),
      }),
      entry.isDirectory && dnd.dropTargetForElements({
        element,
        canDrop: ({source}) => source.element !== element && (
             isHfsData(source.data)
          || isZipData(source.data)
          || isTorrentData(source.data)
        ),
        onDragEnter: () => setDropping(true),
        onDragLeave: () => setDropping(false),
        onDrop: (e) => {
          setDropping(false);
          const {data} = e.source;
          if (isHfsData(data)) {
            cmd.move(data.entry, entry);
          } else if (isZipData(data)) {
            data.cmd.extract(data.entry);
          } else if (isTorrentData(data)) {
            data.cmd.download(data.entry);
          }
        },
      }),
      entry.isDirectory && dnd.dropTargetForExternal({
        element,
        canDrop: dnd.containsFiles,
        getDropEffect: () => 'copy',
        onDragEnter: () => setDropping(true),
        onDragLeave: () => setDropping(false),
        onDrop: (e) => {
          setDropping(false);
          const files = dnd.getFiles(e);
          if (files.length) {
            cmd.upload(entry, files);
          }
        },
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [entry, cmd]);

  return {
    ref,
    ext,
    cmd: Object.fromEntries(Object.entries(cmd).map(
      ([key, fn]) => [key, fn.bind(null, entry)],
    )) as {
      [K in keyof typeof cmd]: Parameters<typeof cmd[K]> extends [HfsDirectoryEntry, ...infer Rest]
        ? (...args: Rest) => ReturnType<typeof cmd[K]>
        : typeof cmd[K]
    },
    opt: {
      ...opt,
      dropping,
    },
  };
}

const $ = Symbol('hfs');
export type HfsData = {[$]: true, entry: HfsDirectoryEntry};
export const isHfsData = (data: Record<string | symbol, unknown>): data is HfsData => data[$] === true;
export const getHfsData = (entry: HfsDirectoryEntry): HfsData => ({[$]: true, entry});
