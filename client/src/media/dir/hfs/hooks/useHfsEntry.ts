import {useRef, useState, useEffect} from 'react';
import {dropTargetForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import {dropTargetForElements, draggable} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {containsFiles, getFiles} from '@atlaskit/pragmatic-drag-and-drop/external/file';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {dndImg} from 'app/utils/web';
import {toPathInfo} from 'app/utils/formatting';

import {isZipData} from 'media/dir/zip/hooks/useZipEntry';
import {isTorrentData} from 'media/dir/torrent/hooks/useTorrentEntry';

import type {View} from 'react-native';
import type {CleanupFn} from '@atlaskit/pragmatic-drag-and-drop/types';
import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsEntryProps} from '../stacks/HfsEntry';

const $ = Symbol('hfs');
export type HfsData = {[$]: true, entry: HfsDirectoryEntry};
export const isHfsData = (data: Record<string | symbol, unknown>): data is HfsData => data[$] === true;
export const getHfsData = (entry: HfsDirectoryEntry): HfsData => ({[$]: true, entry});

export function useHfsEntry(props: HfsEntryProps) {
  const {entry, cmd, opt} = props;
  const [dragging, setDragging] = useState(false);
  const [dropping, setDropping] = useState(false);
  const ext = toPathInfo(entry.name, entry.isDirectory)?.ext;
  const ref = useRef<View>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as unknown as HTMLElement;
    return combine(...[
      draggable({
        element,
        onGenerateDragPreview: ({nativeSetDragImage}) => dndImg(nativeSetDragImage),
        getInitialData: () => getHfsData(entry),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
      }),
      entry.isDirectory && dropTargetForElements({
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
      entry.isDirectory && dropTargetForExternal({
        element,
        canDrop: containsFiles,
        getDropEffect: () => 'copy',
        onDragEnter: () => setDropping(true),
        onDragLeave: () => setDropping(false),
        onDrop: (e) => {
          setDropping(false);
          const files = getFiles(e);
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
      dragging,
      dropping,
    },
  };
}

