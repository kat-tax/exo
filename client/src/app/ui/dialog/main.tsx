import { useState } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { ResponsiveDialogProvider } from './provider';
import { useDialogDevice, useDialogBehavior } from './hooks';

export type ResponsiveDialogProps = React.ComponentProps<typeof DrawerPrimitive.Root> & {
  onlyDrawer?: boolean;
  onlyDialog?: boolean;
  alert?: boolean;
  modal?: boolean;
  dismissible?: boolean;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  shouldScaleBackground?: boolean;
};

export const ResponsiveDialog = ({
  modal = true,
  dismissible = true,
  direction = 'bottom',
  onlyDrawer = false,
  onlyDialog = false,
  alert = false,
  shouldScaleBackground = true,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  children,
  ...props
}: ResponsiveDialogProps) => {
  const [internalState, setInternalState] = useState<boolean>(false);

  const isControlledOpen = typeof controlledOpen === 'undefined';
  const toggleInternalState = () => setInternalState((prev) => !prev);

  const open = isControlledOpen ? internalState : controlledOpen;
  const onOpenChange = isControlledOpen ? toggleInternalState : controlledOnOpenChange;

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
      <ResponsiveDialogImplementation
        open={open}
        onOpenChange={onOpenChange}
        shouldScaleBackground={shouldScaleBackground}
        {...props}>
        {children}
      </ResponsiveDialogImplementation>
    </ResponsiveDialogProvider>
  );
};

// Internal implementation component that uses the context
const ResponsiveDialogImplementation = ({
  open,
  onOpenChange,
  shouldScaleBackground,
  children,
  ...props
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  shouldScaleBackground?: boolean;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof DrawerPrimitive.Root>, 'open' | 'onOpenChange'>) => {
  const { shouldUseDialog } = useDialogDevice();
  const { effectiveModal, effectiveDismissible } = useDialogBehavior();

  const ResponsiveDialogRoot = shouldUseDialog ? DialogPrimitive.Root : DrawerPrimitive.Root;

  return (
    <ResponsiveDialogRoot
      modal={effectiveModal}
      direction={!shouldUseDialog ? effectiveDismissible : undefined}
      dismissible={!shouldUseDialog ? effectiveDismissible : undefined}
      shouldScaleBackground={!shouldUseDialog ? shouldScaleBackground : undefined}
      open={open}
      onOpenChange={onOpenChange}
      {...props}>
      {children}
    </ResponsiveDialogRoot>
  );
};

ResponsiveDialog.displayName = 'ResponsiveDialog';
