import {forwardRef, useImperativeHandle, useState} from 'react';
import {Drawer} from 'vaul';
import {SheetProps, SheetHandle} from './Sheet.base';

export const Sheet = forwardRef<SheetHandle, SheetProps>((props, ref) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = props.open !== undefined;
  const open = isControlled ? props.open : internalOpen;
  const onOpenChange = isControlled ? props.onOpenChange : setInternalOpen;

  useImperativeHandle(ref, () => ({
    present: async () => {
      if (isControlled && props.onOpenChange) {
        props.onOpenChange(true);
      } else {
        setInternalOpen(true);
      }
    },
    dismiss: async () => {
      if (isControlled && props.onOpenChange) {
        props.onOpenChange(false);
      } else {
        setInternalOpen(false);
      }
    }
  }), [isControlled, props.onOpenChange]);

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
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
