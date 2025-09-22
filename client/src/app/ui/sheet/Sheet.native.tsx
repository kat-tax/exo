import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {forwardRef, useRef, useImperativeHandle, useEffect, useState, cloneElement} from 'react';

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
    return cloneElement(trigger as any, {
      onPress: handleTriggerPress,
    });
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
    <>
      {renderTrigger()}
      <TrueSheet
        ref={sheet}
        edgeToEdge
        sizes={['auto', '80%', 'large']}
        onDismiss={() => effectiveOnOpenChange?.(false)}
        {...trueSheetProps}
      />
    </>
  );
});

Sheet.displayName = 'Sheet';
