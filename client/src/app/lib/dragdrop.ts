import {setCustomNativeDragPreview} from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {pointerOutsideOfPreview} from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import type {ElementDragType} from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import type {BaseEventPayload} from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import type {ExternalDragPayload} from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';

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

export function preventDragDrop(element: HTMLElement) {
  const dragEnter = (e: DragEvent) => e.preventDefault();
  const dragOver = (e: DragEvent) => e.preventDefault();
  const drop = (e: DragEvent) => e.preventDefault();
  element.addEventListener('dragenter', dragEnter);
  element.addEventListener('dragover', dragOver);
  element.addEventListener('drop', drop);
  return () => {
    element.removeEventListener('dragenter', dragEnter);
    element.removeEventListener('dragover', dragOver);
    element.removeEventListener('drop', drop);
  };
}

export function droppedFiles(
  payload: ExternalDragPayload,
  callback: (files: Array<File>) => void,
) {
  const {items} = payload;

  const ignored = [
    '.git',
    '.DS_Store',
    'node_modules',
    'Thumbs.db',
    'desktop.ini',
    '$RECYCLE.BIN',
    '.Spotlight-V100',
    '.Trash',
    '.fseventsd',
  ];

  const entries = [];
  let directoryFound = false;
  let fileList: any = [];
  let counter = 0;
  const toArray = (list: any) => Array.prototype.slice.call(list || [], 0);
  const errorHandler = () => {};
  const getDirectoryItems = (reader: any, callback: any) => {
    let entries: any = [];
    const readEntries = () => {
      counter++;
      reader.readEntries((results: any) => {
        if (!results.length) {
          entries.sort();
          counter--;
          callback(entries);
        } else {
          entries = entries.concat(toArray(results));
          counter--;
          readEntries();
        }
      }, errorHandler);
    };
    readEntries();
  };

  const readDirectory = (entries: any) => {
    if (entries <= 0) callback(fileList);
    for (let i = 0; i < entries.length; i++) {
      if (entries[i]) {
        const name = entries[i].name;
        if (ignored.includes(name)) continue;
        if (entries[i].isDirectory) {
          const reader = entries[i].createReader();
          getDirectoryItems(reader, readDirectory);
        } else {
          // Path to the current directory (first entry path in directory)
          let folderPath = entries[i].fullPath.slice(1).split('/'); // Remove starting slash.
          folderPath.pop(); // Remove filename.
          folderPath = folderPath.join('/');
          // Creates a file object from the entry.
          counter++;
          entries[i].file((file: any) => {
            counter--;
            try {
              // Attach the url so we know where its located.
              file.dndRelativePath = folderPath;
              // Add the file to the array.
              fileList = [...fileList, file];
            } catch (e) {}
            // Check if we are completely done.
            if (counter <= 0) callback(fileList);
          }, errorHandler);
        }
      }
    }
  };

  if (items) {
    for (let i = 0; i < items.length; i++) {
      if (!items[i].webkitGetAsEntry) break;
      entries[i] = items[i].webkitGetAsEntry();
      if (entries[i]?.isDirectory) directoryFound = true;
    }
  }

  if (directoryFound) {
    readDirectory(entries);
  } else {
    callback(items
      .map(item => item.getAsFile())
      .filter((file): file is File => file !== null));
  }
}
