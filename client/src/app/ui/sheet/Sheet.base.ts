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
  onOpenChange?: (open: boolean) => void;
}
