import {Drawer} from 'vaul';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {SheetProps, SheetHandle} from './Sheet.base';

export const Sheet = forwardRef<SheetHandle, SheetProps>((props, ref) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const controlled = props.open !== undefined;
  const open = controlled ? props.open : internalOpen;
  const onOpenChange = controlled ? props.onOpenChange : setInternalOpen;

  useImperativeHandle(ref, () => ({
    present: async () => {
      if (controlled && props.onOpenChange) {
        props.onOpenChange(true);
      } else {
        setInternalOpen(true);
      }
    },
    dismiss: async () => {
      if (controlled && props.onOpenChange) {
        props.onOpenChange(false);
      } else {
        setInternalOpen(false);
      }
    }
  }), [controlled, props.onOpenChange]);

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}>
      {props.trigger && (
        <Drawer.Trigger>
          {props.trigger}
        </Drawer.Trigger>
      )}
      <Drawer.Portal>
        <Drawer.Overlay/>
        <Drawer.Content>
          <>{props.children}</>
          <>{props.FooterComponent}</>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
});

Sheet.displayName = 'Sheet';
