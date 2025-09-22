import type {TrueSheetProps, SheetSize} from '@lodev09/react-native-true-sheet';
import type {ReactNode} from 'react';

export const DEFAULT_SIZES: SheetSize[] = [
  'auto',  // collapsed
  '80%',   // half-expanded
  'large', // expanded
];

export interface SheetHandle {
  present: () => Promise<void>;
  dismiss: () => Promise<void>;
}

export interface SheetProps extends TrueSheetProps {
  open?: boolean;
  title?: string;
  description?: string;
  trigger?: ReactNode;
  /** Temporary property for web only, will be removed when vaul supports "auto" */
  autoWebSize?: number;
  onOpenChange?: (open: boolean) => void;
}
