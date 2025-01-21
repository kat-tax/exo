import {useState, useEffect} from 'react';
import {draggable} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';

import type {View} from 'react-native';
import type {CleanupFn} from '@atlaskit/pragmatic-drag-and-drop/types';
import type {TorrentFileEntry} from '../types';
import type {TorrentCmd} from './useTorrent';

export function useTorrentDnd(
  entry: TorrentFileEntry,
  cmd: TorrentCmd,
  ref: React.RefObject<View>,
) {
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as unknown as HTMLElement;
    return combine(...[
      draggable({
        element,
        getInitialData: () => getTorrentData(entry, cmd),
        onGenerateDragPreview: ({nativeSetDragImage}) =>
          getDragPreview(nativeSetDragImage),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [entry, cmd, ref.current]);

  return {isDragging};
}

const torrentDataKey = Symbol('torrent');

export type TorrentData = {
  [torrentDataKey]: true;
  entry: TorrentFileEntry;
  cmd: TorrentCmd;
};

export function getTorrentData(
  entry: TorrentFileEntry,
  cmd: TorrentCmd,
): TorrentData {
  return {[torrentDataKey]: true, entry, cmd};
}

export function isTorrentData(
  data: Record<string | symbol, unknown>,
): data is TorrentData {
  return data[torrentDataKey] === true;
}

export function getDragPreview(
  nativeSetDragImage: ((image: Element, x: number, y: number) => void) | null,
  itemCount = 1,
) {
  setCustomNativeDragPreview({
    nativeSetDragImage,
    getOffset: pointerOutsideOfPreview({x: '12px', y: '12px'}),
    render({container}) {
      const badge = document.createElement('div');
      badge.style.backgroundColor = '#3b82f6';
      badge.style.color = '#FFFFFF';
      badge.style.fontFamily = 'sans-serif';
      badge.style.fontSize = '10px';
      badge.style.fontWeight = 'bold';
      badge.style.width = '16px';
      badge.style.height = '16px';
      badge.style.borderRadius = '50%';
      badge.style.display = 'flex';
      badge.style.alignItems = 'center';
      badge.style.justifyContent = 'center';
      badge.textContent = itemCount.toString();
      container.appendChild(badge);
    },
  });
}
