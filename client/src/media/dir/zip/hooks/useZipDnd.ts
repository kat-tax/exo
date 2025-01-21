import {useState, useEffect} from 'react';
import {draggable} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {dndImg} from 'app/utils/web';

import type {CleanupFn} from '@atlaskit/pragmatic-drag-and-drop/types';
import type {ZipEntry} from '../types';
import type {ZipCmd} from './useZip';

const $ = Symbol('zip');
export type ZipData = {[$]: true; entry: ZipEntry; cmd: ZipCmd};
export const isZipData = (data: Record<string | symbol, unknown>): data is ZipData => data[$] === true;
export const getZipData = (entry: ZipEntry, cmd: ZipCmd): ZipData => ({[$]: true, entry, cmd});

export function useZipDnd(
  entry: ZipEntry,
  cmd: ZipCmd,
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
        getInitialData: () => getZipData(entry, cmd),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [entry, cmd, ref.current]);

  return {isDragging};
}
