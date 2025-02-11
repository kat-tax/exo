import {useRef, useState, useEffect} from 'react';
import {toPathInfo} from 'app/utils/formatting';
import * as dnd from 'app/utils/dragdrop';
import {bind} from 'media/utils/bind';

import type {View} from 'react-native';
import type {CleanupFn} from 'app/utils/dragdrop';
import type {ZipFileEntry, ZipCmd} from 'media/dir/types/zip';
import type {EntryZipProps} from 'media/dir/stacks/entry-zip';

const $ = Symbol('zip');
export type ZipData = {[$]: true; entry: ZipFileEntry; cmd: ZipCmd};
export const isZipData = (data: Record<string | symbol, unknown>): data is ZipData => data[$] === true;
export const getZipData = (entry: ZipFileEntry, cmd: ZipCmd): ZipData => ({[$]: true, entry, cmd});

export function useEntryZip({item, cmd, opt}: EntryZipProps) {
  const [dragging, setDragging] = useState(false);
  const ext = toPathInfo(item.name, item.dir)?.ext;
  const ref = useRef<View>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as unknown as HTMLElement;
    return dnd.combine(...[
      dnd.draggable({
        element,
        getInitialData: () => getZipData(item, cmd),
        onGenerateDragPreview: dnd.dragPreview(1),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [item, cmd]);

  return {
    ref,
    ext,
    cmd: bind(cmd, item),
    opt: {...opt, dragging},
  };
}
