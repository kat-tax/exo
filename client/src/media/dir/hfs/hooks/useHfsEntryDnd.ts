import {useState, useEffect} from 'react';
import {dropTargetForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import {dropTargetForElements, draggable} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {containsFiles, getFiles} from '@atlaskit/pragmatic-drag-and-drop/external/file';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {dndImg} from 'app/utils/web';

import {isZipData} from 'media/dir/zip/hooks/useZipDnd';
import {isTorrentData} from 'media/dir/torrent/hooks/useTorrentDnd';

import type {CleanupFn} from '@atlaskit/pragmatic-drag-and-drop/types';
import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsEntryCmd} from './useHfsEntry';

const $ = Symbol('hfs');
export type HfsData = {[$]: true, entry: HfsDirectoryEntry};
export const isHfsData = (data: Record<string | symbol, unknown>): data is HfsData => data[$] === true;
export const getHfsData = (entry: HfsDirectoryEntry): HfsData => ({[$]: true, entry});

export function useHfsEntryDnd(
  entry: HfsDirectoryEntry,
  cmd: HfsEntryCmd,
  ref: React.RefObject<unknown>,
) {
  const [isDragging, setIsDragging] = useState(false);
  const [isDropping, setIsDropping] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as HTMLElement;
    return combine(...[
      draggable({
        element,
        onGenerateDragPreview: ({nativeSetDragImage}) => dndImg(nativeSetDragImage),
        getInitialData: () => getHfsData(entry),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      entry.isDirectory && dropTargetForElements({
        element,
        canDrop: ({source}) => source.element !== element && (
             isHfsData(source.data)
          || isZipData(source.data)
          || isTorrentData(source.data)
        ),
        onDragEnter: () => setIsDropping(true),
        onDragLeave: () => setIsDropping(false),
        onDrop: (e) => {
          setIsDropping(false);
          const {data} = e.source;
          if (isHfsData(data)) {
            cmd.transfer(data.entry);
          } else if (isZipData(data)) {
            data.cmd.extract(data.entry, entry.name);
          } else if (isTorrentData(data)) {
            data.cmd.download(data.entry, entry.name);
          }
        },
      }),
      entry.isDirectory && dropTargetForExternal({
        element,
        canDrop: containsFiles,
        getDropEffect: () => 'copy',
        onDragEnter: () => setIsDropping(true),
        onDragLeave: () => setIsDropping(false),
        onDrop: (e) => {
          setIsDropping(false);
          const files = getFiles(e);
          if (files.length) {
            cmd.upload(files);
          }
        },
      }),
    ].filter(Boolean) as CleanupFn[]);
  }, [entry, ref.current, cmd.transfer, cmd.upload]);

  return {isDragging, isDropping};
}
