import type {ViewProps} from 'react-native';

export interface SafeAreaProviderProps extends ViewProps {
  children?: React.ReactNode;
  initialMetrics?: Metrics | null;
  /** @deprecated */
  initialSafeAreaInsets?: EdgeInsets | null;
}

export interface SafeAreaViewProps extends ViewProps {
  children?: React.ReactNode;
  mode?: 'padding' | 'margin';
  edges?: Edges;
}

export type Edge = 'top' | 'right' | 'bottom' | 'left';
export type EdgeMode = 'off' | 'additive' | 'maximum';
export type EdgeRecord = Partial<Record<Edge, EdgeMode>>;
export type Edges = readonly Edge[] | Readonly<EdgeRecord>;

export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Metrics {
  insets: EdgeInsets;
  frame: Rect;
}
