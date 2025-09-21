import React, { forwardRef } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import TrueSheet from '@lodev09/react-native-true-sheet';
import {Icon} from 'react-exo/icon';

import { useDialogDevice, useDialogBehavior } from './hooks';
import { useResponsiveDialog } from './provider';

// Pure UI Components for React Native

export const ResponsiveDialogTrigger = forwardRef<
  View,
  React.ComponentProps<typeof Pressable>
>(({ children, ...props }, ref) => {
  return (
    <Pressable ref={ref} {...props}>
      {children}
    </Pressable>
  );
});
ResponsiveDialogTrigger.displayName = 'ResponsiveDialogTrigger';

export const ResponsiveDialogPortal = ({children}: {children: React.ReactNode}) => {
  // In React Native, portal functionality is handled by Modal/TrueSheet
  return <>{children}</>;
};
ResponsiveDialogPortal.displayName = 'ResponsiveDialogPortal';

export const ResponsiveDialogOverlay = ({style, ...props}: React.ComponentProps<typeof View>) => {
  // Overlay is handled by Modal/TrueSheet background
  return null;
};
ResponsiveDialogOverlay.displayName = 'ResponsiveDialogOverlay';

export const ResponsiveDialogClose = forwardRef<
  View,
  React.ComponentProps<typeof Pressable> & {
    onPress?: () => void;
  }
>(({ children, onPress, ...props }, ref) => {
  const { shouldPreventClose } = useDialogBehavior();

  const handlePress = () => {
    if (!shouldPreventClose && onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      accessibilityLabel="Close"
      {...props}
    >
      {children}
    </Pressable>
  );
});
ResponsiveDialogClose.displayName = 'ResponsiveDialogClose';

export const ResponsiveDialogContent = forwardRef<
  View,
  React.ComponentProps<typeof View> & {
    visible?: boolean;
    onRequestClose?: () => void;
    showCloseButton?: boolean;
    /** Custom close button style */
    closeButtonStyle?: any;
    /** Custom drag handle style */
    dragHandleStyle?: any;
  }
>(({
  children,
  visible = false,
  onRequestClose,
  showCloseButton = true,
  closeButtonStyle,
  dragHandleStyle,
  style,
  ...props
}, ref) => {
  const { shouldUseDialog } = useDialogDevice();
  const { direction } = useResponsiveDialog();
  const {
    shouldShowCloseButton: computedShowCloseButton,
    shouldPreventEscape,
    shouldPreventOutsideInteraction
  } = useDialogBehavior();

  const shouldShowClose = computedShowCloseButton && showCloseButton;

  if (shouldUseDialog) {
    // Use React Native Modal for desktop-like dialogs
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={shouldPreventOutsideInteraction ? undefined : onRequestClose}
        {...props}
      >
        <View style={styles.modalOverlay}>
          <View
            ref={ref}
            style={[styles.modalContent, style]}
          >
            {children}
            {shouldShowClose && (
              <ResponsiveDialogClose
                onPress={onRequestClose}
                style={[styles.closeButton, closeButtonStyle]}
              >
                <X size={20} color="#666" />
              </ResponsiveDialogClose>
            )}
          </View>
        </View>
      </Modal>
    );
  }

  // Use TrueSheet for mobile drawer experience
  return (
    <TrueSheet
      ref={ref}
      visible={visible}
      onDismiss={shouldPreventOutsideInteraction ? undefined : onRequestClose}
      dismissible={!shouldPreventOutsideInteraction}
      // Map direction to TrueSheet presentation
      presentationStyle={direction === 'bottom' ? 'detent' : 'fullScreen'}
      sizes={direction === 'bottom' ? ['auto', 'large'] : undefined}
      cornerRadius={direction === 'bottom' ? 12 : 0}
      {...props}
    >
      <View style={[styles.sheetContent, style]}>
        {direction === 'bottom' && (
          <View style={[styles.dragHandle, dragHandleStyle]} />
        )}
        {children}
        {shouldShowClose && (
          <ResponsiveDialogClose
            onPress={onRequestClose}
            style={[styles.closeButton, closeButtonStyle]}>
            <Icon name="ph:x" size={20}/>
          </ResponsiveDialogClose>
        )}
      </View>
    </TrueSheet>
  );
});
ResponsiveDialogContent.displayName = 'ResponsiveDialogContent';

export const ResponsiveDialogHeader = forwardRef<
  View,
  React.ComponentProps<typeof View>
>(({ children, style, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.header, style]}
      {...props}
    >
      {children}
    </View>
  );
});
ResponsiveDialogHeader.displayName = 'ResponsiveDialogHeader';

export const ResponsiveDialogFooter = forwardRef<
  View,
  React.ComponentProps<typeof View>
>(({ children, style, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.footer, style]}
      {...props}
    >
      {children}
    </View>
  );
});
ResponsiveDialogFooter.displayName = 'ResponsiveDialogFooter';

export const ResponsiveDialogTitle = forwardRef<
  Text,
  React.ComponentProps<typeof Text>
>(({ children, style, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      style={[styles.title, style]}
      {...props}
    >
      {children}
    </Text>
  );
});
ResponsiveDialogTitle.displayName = 'ResponsiveDialogTitle';

export const ResponsiveDialogDescription = forwardRef<
  Text,
  React.ComponentProps<typeof Text>
>(({ children, style, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      style={[styles.description, style]}
      {...props}
    >
      {children}
    </Text>
  );
});
ResponsiveDialogDescription.displayName = 'ResponsiveDialogDescription';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxWidth: '90%',
    maxHeight: '80%',
    minWidth: 300,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  sheetContent: {
    padding: 16,
    minHeight: 200,
  },
  dragHandle: {
    width: 32,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
});
