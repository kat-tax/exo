import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {View, Pressable} from 'react-native';
import {forwardRef, useRef, useImperativeHandle, useEffect, useState, cloneElement, isValidElement} from 'react';

import {SheetProps, SheetHandle} from './Sheet.base';

export const Sheet = forwardRef<SheetHandle, SheetProps>((props, ref) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const {open, onOpenChange, trigger, ...trueSheetProps} = props;
  const sheet = useRef<TrueSheet>(null);
  const controlled = open !== undefined;
  const effectiveOpen = controlled ? open : internalOpen;
  const effectiveOnOpenChange = controlled ? onOpenChange : setInternalOpen;

  const handleTriggerPress = () => {
    if (controlled && onOpenChange) {
      onOpenChange(true);
    } else {
      setInternalOpen(true);
    }
  };

  const renderTrigger = () => {
    if (!trigger) return null;
    // React element with onPress, clone it and add our handler
    if (isValidElement(trigger)) {
      const triggerProps = trigger.props as any;
      if (triggerProps && typeof triggerProps === 'object' && 'onPress' in triggerProps) {
        const originalOnPress = triggerProps.onPress;
        return cloneElement(trigger as any, {
          onPress: (e: any) => {
            originalOnPress?.(e);
            handleTriggerPress();
          }
        });
      }
    }
    // Otherwise wrap it in a Pressable
    return (
      <Pressable onPress={handleTriggerPress}>
        {trigger}
      </Pressable>
    );
  };

  useImperativeHandle(ref, () => ({
    present: async () => {
      if (controlled && onOpenChange) {
        onOpenChange(true);
      } else {
        setInternalOpen(true);
      }
    },
    dismiss: async () => {
      if (controlled && onOpenChange) {
        onOpenChange(false);
      } else {
        setInternalOpen(false);
      }
    }
  }), [controlled, onOpenChange]);

  useEffect(() => {
    if (effectiveOpen) {
      sheet.current?.present();
    } else {
      sheet.current?.dismiss();
    }
  }, [effectiveOpen]);

  return (
    <View>
      {renderTrigger()}
      <TrueSheet
        ref={sheet}
        edgeToEdge
        sizes={['auto', '80%', 'large']}
        onDismiss={() => effectiveOnOpenChange?.(false)}
        {...trueSheetProps}
      />
    </View>
  );
});

Sheet.displayName = 'Sheet';
