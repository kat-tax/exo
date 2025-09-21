import { useState } from 'react';
import { ResponsiveDialogProvider } from './provider';
import { useDialogDevice, useDialogBehavior } from './hooks.native';

export type ResponsiveDialogProps = {
  onlyDrawer?: boolean;
  onlyDialog?: boolean;
  alert?: boolean;
  modal?: boolean;
  dismissible?: boolean;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  shouldScaleBackground?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  // Native-specific props
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
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
  animationType = 'slide',
  transparent = false,
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
        animationType={animationType}
        transparent={transparent}>
        {children}
      </ResponsiveDialogImplementation>
    </ResponsiveDialogProvider>
  );
};

// Internal implementation component that uses the context
const ResponsiveDialogImplementation = ({
  children,
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  shouldScaleBackground?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  children: React.ReactNode;
}) => {
  // In React Native, the implementation is handled by the ResponsiveDialogContent component
  // This component just passes the state down via context
  return <>{children}</>;
};

ResponsiveDialog.displayName = 'ResponsiveDialog';
