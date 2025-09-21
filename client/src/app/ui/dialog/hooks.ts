import useMediaQuery from '@/hooks/use-media-query';
import { useResponsiveDialog } from './provider';

const MOBILE_BREAKPOINT = '(min-width: 640px)';

export const useDialogDevice = () => {
  const { onlyDrawer, onlyDialog } = useResponsiveDialog();
  const isDesktop = useMediaQuery(MOBILE_BREAKPOINT);

  const shouldUseDialog = onlyDialog || (!onlyDrawer && isDesktop);

  return {
    isDesktop,
    shouldUseDialog,
    isDrawer: !shouldUseDialog,
  };
};

export const useDialogBehavior = () => {
  const { modal, dismissible, alert } = useResponsiveDialog();

  const effectiveModal = alert ? true : modal;
  const effectiveDismissible = alert ? true : dismissible;
  const shouldPreventClose = !effectiveDismissible && !alert;
  const shouldPreventEscape = !effectiveDismissible && !alert;
  const shouldPreventOutsideInteraction = !effectiveModal || (!effectiveDismissible && !alert) || alert;
  const shouldShowCloseButton = !alert;

  return {
    effectiveModal,
    effectiveDismissible,
    shouldPreventClose,
    shouldPreventEscape,
    shouldPreventOutsideInteraction,
    shouldShowCloseButton,
  };
};
