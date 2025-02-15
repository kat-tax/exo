import {useRef, useState, useEffect} from 'react';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {toPath} from 'app/utils/formatting';
import * as dnd from 'app/utils/dragdrop';
import * as $ from 'media/utils/entry';

import type {View} from 'react-native';
import type {CleanupFn} from 'app/utils/dragdrop';
import type {TorrentFileEntry, TorrentCmd} from 'media/dir/types/torrent';
import type {EntryTorrentProps} from 'media/dir/stacks/entry-torrent';

export const {is, get, type} = $.tag<TorrentFileEntry, TorrentCmd>('torrent');

export function useEntryTorrent({item, cmd, opt}: EntryTorrentProps) {
  const [dragging, setDragging] = useState(false);

  // Spatial navigation
  const {focused, ref: refFoc} = useFocusable({
    onEnterPress: () => cmd.download(item),
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
    ext: toPath(item.name, false)?.ext,
    cmd: $.bind(cmd, item),
    opt: {...opt, focused, dragging},
    ref: [refDnd, refFoc],
  };
}
