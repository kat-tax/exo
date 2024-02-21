import type {DragEvent, MouseEvent, ReactNode} from 'react';

export interface PointerProps {
  children: ReactNode,
  onDoubleClick?(event: MouseEvent): void,
  onContextMenu?(event: MouseEvent): void,
  onDragStart?(event: DragEvent): void,
  onDragEnd?(event: DragEvent): void,
  onDragDrop?(event: DragEvent): void,
}
