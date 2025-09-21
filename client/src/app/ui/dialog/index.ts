// Export provider types and hook
export type {
  ResponsiveDialogContextProps,
  ResponsiveDialogProviderProps,
} from './provider';

export {
  ResponsiveDialogContext,
  ResponsiveDialogProvider,
  useResponsiveDialog,
} from './provider';

// Export hooks
export {
  useDialogDevice,
  useDialogBehavior,
} from './hooks';

// Export logic components
export type { ResponsiveDialogRootProps } from './logic';
export {
  ResponsiveDialogRoot,
  useDialogImplementation,
} from './logic';

// Export main dialog component
export type { ResponsiveDialogProps } from './main';
export { ResponsiveDialog } from './main';

// Export UI components
export {
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogOverlay,
  ResponsiveDialogPortal,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from './ui';
