import {useCallback, useState} from 'react';
import type {DragEvent, MouseEvent} from 'react';
import type {PointerProps} from './Pointer.interface';

export function Pointer(props: PointerProps) {
  const doubleClick = useCallback((e: MouseEvent) => {
    if (props.onDoubleClick) {
      e.stopPropagation();
      props.onDoubleClick(e);
    }
  }, [props.onDoubleClick]);

  const contextMenu = useCallback((e: MouseEvent) => {
    if (props.onContextMenu) {
      e.preventDefault();
      e.stopPropagation();
      props.onContextMenu(e);
    }
  }, [props.onContextMenu]);

  const [stateDrop, setDrop] = useState(0);

  const dragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const dragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDrop(stateDrop + 1);
  }, []);

  const dragLeave = useCallback((e: DragEvent) => {
    e.stopPropagation();
    setDrop(stateDrop - 1);
  }, []);

  const dragDrop = useCallback((e: DragEvent) => {
    if (props.onDragDrop) {
      e.preventDefault();
      e.stopPropagation();
      setDrop(0);
      props.onDragDrop(e);
    }
  }, [props.onDragDrop]);

  const dragStart = useCallback((e: DragEvent) => {
    if (props.onDragStart) {
      props.onDragStart(e);
    }
  }, [props.onDragStart]);

  const dragEnd = useCallback((e: DragEvent) => {
    if (props.onDragEnd) {
      props.onDragEnd(e);
    }
  }, [props.onDragEnd]);

  return (
    <div
      draggable={!!dragStart}
      onDragStart={dragStart}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDragOver={dragOver}
      onDragEnd={dragEnd}
      onDrop={dragDrop}
      onDoubleClick={doubleClick}
      onContextMenu={contextMenu}
      style={{display: 'flex', flex: 1, height: '100%'}}>
      {props.children}
    </div>
  );
}
