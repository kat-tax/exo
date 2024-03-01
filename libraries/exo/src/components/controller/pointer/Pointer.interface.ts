import type {DragEvent, MouseEvent, ReactNode} from 'react';

export type PointerComponent = (props: PointerProps) => JSX.Element;

export interface PointerProps {
  children: ReactNode,
  onDoubleClick?(event: MouseEvent): void,
  onContextMenu?(event: MouseEvent): void,
  onDragStart?(event: DragEvent): void,
  onDragEnd?(event: DragEvent): void,
  onDragDrop?(event: DragEvent): void,
}
