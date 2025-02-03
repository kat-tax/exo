export {dropTargetForExternal} from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
export {dropTargetForElements, draggable} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
export {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
export {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
export {containsFiles, getFiles} from '@atlaskit/pragmatic-drag-and-drop/external/file';
export {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';

export type {CleanupFn} from '@atlaskit/pragmatic-drag-and-drop/types';

import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';

export function dragPreview(
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
