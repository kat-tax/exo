import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import type {ElementDragType} from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import type {BaseEventPayload} from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';

export {dropTargetForElements, draggable} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
export {dropTargetForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
export {containsFiles, getFiles} from '@atlaskit/pragmatic-drag-and-drop/external/file';
export {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
export {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
export {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
export type {CleanupFn} from '@atlaskit/pragmatic-drag-and-drop/types';

export const dragPreview = (count: number) => (e: BaseEventPayload<ElementDragType> & {
  nativeSetDragImage: DataTransfer['setDragImage'] | null;
}) => {
  setCustomNativeDragPreview({
    nativeSetDragImage: e.nativeSetDragImage,
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
      badge.textContent = count.toString();
      container.appendChild(badge);
    },
  });
}
