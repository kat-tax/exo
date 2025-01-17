import {useState, useEffect} from 'react';
import {dropTargetForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import {dropTargetForElements, draggable} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {containsFiles, getFiles} from '@atlaskit/pragmatic-drag-and-drop/external/file';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';

import type {View} from 'react-native';
import type {CleanupFn} from '@atlaskit/pragmatic-drag-and-drop/types';
import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsEntryCmd} from './useHfsEntryCmd';

export function useHfsEntryDnd(
  entry: HfsDirectoryEntry,
  cmd: HfsEntryCmd,
  ref: React.RefObject<View>,
) {
  const [isDragging, setIsDragging] = useState(false);
  const [isDropping, setIsDropping] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as unknown as HTMLElement;
    return combine(...[
      draggable({
        element,
        getInitialData: () => getHfsData(entry),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      entry.isDirectory && dropTargetForElements({
        element,
        canDrop: ({source}) => source.element !== element && isHfsData(source.data),
        onDragEnter: () => setIsDropping(true),
        onDragLeave: () => setIsDropping(false),
        onDrop: (e) => {
          setIsDropping(false);
          if (isHfsData(e.source.data)) {
            console.log('>> dropped entry', e.source.data.entry);
            cmd.transfer(e.source.data.entry);
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

const hfsDataKey = Symbol('hfs');

export type HfsData = {[hfsDataKey]: true; entry: HfsDirectoryEntry};

export function getHfsData(entry: HfsDirectoryEntry): HfsData {
  return {[hfsDataKey]: true, entry};
}

export function isHfsData(data: Record<string | symbol, unknown>): data is HfsData {
  return data[hfsDataKey] === true;
}
