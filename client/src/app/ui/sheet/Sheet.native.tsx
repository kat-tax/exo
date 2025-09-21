import {forwardRef, useRef, useImperativeHandle, useEffect} from 'react';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {SheetProps, SheetHandle} from './Sheet.base';

export const Sheet = forwardRef<SheetHandle, SheetProps>((props, ref) => {
  const sheet = useRef<TrueSheet>(null);

  useImperativeHandle(ref, () => ({
    present: async () => {
      await sheet.current?.present();
    },
    dismiss: async () => {
      await sheet.current?.dismiss();
    }
  }), []);

  // Handle controlled open state
  useEffect(() => {
    if (props.open !== undefined) {
      if (props.open) {
        sheet.current?.present();
      } else {
        sheet.current?.dismiss();
      }
    }
  }, [props.open]);

  // Extract open, onOpenChange, trigger from props to avoid passing them to TrueSheet
  const {open, onOpenChange, trigger, FooterComponent, ...trueSheetProps} = props;

  // Type-safe FooterComponent handling
  const validFooterComponent = FooterComponent &&
    (typeof FooterComponent === 'function' ||
     (typeof FooterComponent === 'object' && FooterComponent !== null && 'type' in FooterComponent))
    ? FooterComponent as React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | React.ComponentType<unknown>
    : undefined;

  return (
    <TrueSheet
      ref={sheet}
      onDismiss={() => onOpenChange?.(false)}
      FooterComponent={validFooterComponent}
      {...trueSheetProps}
    />
  );
});

Sheet.displayName = 'Sheet';
