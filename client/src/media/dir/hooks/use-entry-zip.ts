import {useRef, useState, useEffect} from 'react';
import {toPathInfo} from 'app/utils/formatting';
import {bind} from 'media/utils/bind';
import * as dnd from 'app/utils/dragdrop';

import type {View} from 'react-native';
import type {CleanupFn} from 'app/utils/dragdrop';
import type {ZipFileEntry, ZipCmd} from 'media/dir/types/zip';
import type {EntryZipProps} from 'media/dir/stacks/entry-zip';

const $ = Symbol('zip');
export type ZipData = {[$]: true; entry: ZipFileEntry; cmd: ZipCmd};
export const isZipData = (data: Record<string | symbol, unknown>): data is ZipData => data[$] === true;
export const getZipData = (entry: ZipFileEntry, cmd: ZipCmd): ZipData => ({[$]: true, entry, cmd});

export function useEntryZip(props: EntryZipProps) {
  const {entry, cmd, opt} = props;
  const [dragging, setDragging] = useState(false);
  const ext = toPathInfo(entry.name, entry.dir)?.ext;
  const ref = useRef<View>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as unknown as HTMLElement;
    return dnd.combine(...[
      dnd.draggable({
        element,
        getInitialData: () => getZipData(entry, cmd),
        onGenerateDragPreview: dnd.dragPreview(1),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [entry, cmd]);

  return {
    ref,
    ext,
    cmd: bind(cmd, entry),
    opt: {...opt, dragging},
  };
}
