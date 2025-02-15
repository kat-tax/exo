import {useRef, useState, useEffect} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {toPath} from 'app/utils/formatting';
import * as dnd from 'app/utils/dragdrop';
import * as $ from 'media/utils/entry';

import type {View} from 'react-native';
import type {CleanupFn} from 'app/utils/dragdrop';
import type {ZipFileEntry, ZipCmd} from 'media/dir/types/zip';
import type {EntryZipProps} from 'media/dir/stacks/entry-zip';

export const {is, get, type} = $.tag<ZipFileEntry, ZipCmd>('zip');

export function useEntryZip({item, cmd, opt}: EntryZipProps) {
  const [dragging, setDragging] = useState(false);

  // Spatial navigation
  const {focused, ref: refFoc} = useFocusable({
    onEnterPress: () => cmd.extract(item),
  });

  // Drag and drop
  const refDnd = useRef<View>(null);
  useEffect(() => {
    if (!refDnd.current) return;
    const element = refDnd.current as unknown as HTMLElement;
    return dnd.combine(...[
      dnd.draggable({
        element,
        getInitialData: () => get(item, cmd),
        onGenerateDragPreview: dnd.dragPreview(1),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [item, cmd]);

  return {
    ext: toPath(item.name, item.dir)?.ext,
    cmd: $.bind(cmd, item),
    opt: {...opt, focused, dragging},
    ref: [refDnd, refFoc],
  };
}
