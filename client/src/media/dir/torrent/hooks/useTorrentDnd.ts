import {useState, useEffect} from 'react';
import {draggable} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {dndImg} from 'app/utils/web';

import type {CleanupFn} from '@atlaskit/pragmatic-drag-and-drop/types';
import type {TorrentFileEntry} from '../types';
import type {TorrentCmd} from './useTorrent';

const $ = Symbol('torrent');
export type TorrentData = {[$]: true; entry: TorrentFileEntry; cmd: TorrentCmd};
export const isTorrentData = (data: Record<string | symbol, unknown>): data is TorrentData => data[$] === true;
export const getTorrentData = (entry: TorrentFileEntry, cmd: TorrentCmd): TorrentData => ({[$]: true, entry, cmd});

export function useTorrentDnd(
  entry: TorrentFileEntry,
  cmd: TorrentCmd,
  ref: React.RefObject<unknown>,
) {
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as HTMLElement;
    return combine(...[
      draggable({
        element,
        onGenerateDragPreview: ({nativeSetDragImage}) => dndImg(nativeSetDragImage),
        getInitialData: () => getTorrentData(entry, cmd),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [entry, cmd, ref.current]);

  return {isDragging};
}
