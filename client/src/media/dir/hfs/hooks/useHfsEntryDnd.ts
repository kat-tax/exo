import {useState, useEffect} from 'react';
import {dropTargetForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
import {dropTargetForElements, draggable} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import {containsFiles, getFiles} from '@atlaskit/pragmatic-drag-and-drop/external/file';
import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {isZipData} from 'media/dir/zip/hooks/useZipDnd';

import type {View} from 'react-native';
import type {CleanupFn} from '@atlaskit/pragmatic-drag-and-drop/types';
import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {HfsEntryCmd} from './useHfsEntry';

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
        onGenerateDragPreview: ({nativeSetDragImage}) =>
          getDragPreview(nativeSetDragImage),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      entry.isDirectory && dropTargetForElements({
        element,
        canDrop: ({source}) => source.element !== element
          && (isHfsData(source.data) || isZipData(source.data)),
        onDragEnter: () => setIsDropping(true),
        onDragLeave: () => setIsDropping(false),
        onDrop: (e) => {
          setIsDropping(false);
          if (isHfsData(e.source.data)) {
            cmd.transfer(e.source.data.entry);
          } else if (isZipData(e.source.data)) {
            // TODO: add path in front of entry.name
            e.source.data.cmd.extract(e.source.data.entry, entry.name);
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
