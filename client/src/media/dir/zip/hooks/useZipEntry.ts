import {useRef, useState, useEffect} from 'react';
import {draggable} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {dndImg} from 'app/utils/web';
import {toPathInfo} from 'app/utils/formatting';

import type {View} from 'react-native';
import type {CleanupFn} from '@atlaskit/pragmatic-drag-and-drop/types';
import type {ZipFileEntry, ZipCmd} from '../types';
import type {ZipEntryProps} from '../stacks/ZipEntry';

const $ = Symbol('zip');
export type ZipData = {[$]: true; entry: ZipFileEntry; cmd: ZipCmd};
export const isZipData = (data: Record<string | symbol, unknown>): data is ZipData => data[$] === true;
export const getZipData = (entry: ZipFileEntry, cmd: ZipCmd): ZipData => ({[$]: true, entry, cmd});

export function useZipEntry(props: ZipEntryProps) {
  const {entry, cmd, opt} = props;
  const [dragging, setDragging] = useState(false);
  const ext = toPathInfo(entry.name, entry.dir)?.ext;
  const ref = useRef<View>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as unknown as HTMLElement;
    return combine(...[
      draggable({
        element,
        onGenerateDragPreview: ({nativeSetDragImage}) => dndImg(nativeSetDragImage),
        getInitialData: () => getZipData(entry, cmd),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [entry, cmd]);

  return {
    ref,
    ext,
    cmd: Object.fromEntries(Object.entries(cmd).map(
      ([key, fn]) => [key, fn.bind(null, entry)],
    )) as {
      [K in keyof typeof cmd]: Parameters<typeof cmd[K]> extends [ZipFileEntry, ...infer Rest]
        ? (...args: Rest) => ReturnType<typeof cmd[K]>
        : typeof cmd[K]
    },
    opt: {
      ...opt,
      dragging,
    },
  };
}
