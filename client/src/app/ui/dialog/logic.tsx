import { ResponsiveDialogProvider } from './provider';
import { useDialogDevice, useDialogBehavior } from './hooks';

export type ResponsiveDialogRootProps = {
  modal?: boolean;
  dismissible?: boolean;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  onlyDrawer?: boolean;
  onlyDialog?: boolean;
  alert?: boolean;
  shouldScaleBackground?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

export const ResponsiveDialogRoot = ({
  modal = true,
  dismissible = true,
  direction = 'bottom',
  onlyDrawer = false,
  onlyDialog = false,
  alert = false,
  children,
}: ResponsiveDialogRootProps) => {
  const effectiveModal = alert ? true : modal;
  const effectiveDismissible = alert ? true : dismissible;

  return (
    <ResponsiveDialogProvider
      modal={effectiveModal}
      dismissible={effectiveDismissible}
      direction={direction}
      onlyDrawer={onlyDrawer}
      onlyDialog={onlyDialog}
      alert={alert}>
      {children}
    </ResponsiveDialogProvider>
  );
};

export const useDialogImplementation = () => {
  const { shouldUseDialog } = useDialogDevice();
  const { effectiveModal, effectiveDismissible } = useDialogBehavior();

  return {
    shouldUseDialog,
    effectiveModal,
    effectiveDismissible,
  };
};
