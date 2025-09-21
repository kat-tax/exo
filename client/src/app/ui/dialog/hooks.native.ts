import { Dimensions, Platform } from 'react-native';
import { useResponsiveDialog } from './provider';

// Native device detection using React Native's Dimensions API
export const useDialogDevice = () => {
  const { onlyDrawer, onlyDialog } = useResponsiveDialog();
  const { width } = Dimensions.get('window');

  // Consider devices with width >= 640px as desktop (like tablets in landscape)
  // This matches the web breakpoint from the original implementation
  const isDesktop = width >= 640;

  // On React Native, we generally prefer native UI patterns
  // Tablets and larger devices can use modal dialogs
  // Phones typically use sheet/drawer interfaces
  const shouldUseDialog = onlyDialog || (!onlyDrawer && (Platform.isTV || isDesktop));

  return {
    isDesktop,
    shouldUseDialog,
    isDrawer: !shouldUseDialog,
    screenWidth: width,
    platform: Platform.OS,
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
