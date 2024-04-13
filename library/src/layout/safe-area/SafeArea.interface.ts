import type {ViewProps} from 'react-native';

export interface SafeAreaProviderProps extends ViewProps {
  children?: React.ReactNode,
  initialMetrics?: Metrics | null,
}

export interface SafeAreaViewProps extends ViewProps {
  children?: React.ReactNode,
  mode?: 'padding' | 'margin',
  edges?: Edges,
}

export interface Rect {
  x: number,
  y: number,
  width: number,
  height: number,
}

export interface Metrics {
  insets: EdgeInsets,
  frame: Rect,
}

export interface EdgeInsets {
  top: number,
  right: number,
  bottom: number,
  left: number,
}

export type Edge = 'top' | 'right' | 'bottom' | 'left';
export type Edges = readonly Edge[] | Readonly<EdgeRecord>;
export type EdgeMode = 'off' | 'additive' | 'maximum';
export type EdgeRecord = Partial<Record<Edge, EdgeMode>>;
