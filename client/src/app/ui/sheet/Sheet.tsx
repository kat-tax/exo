import {Drawer} from 'vaul';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {SheetProps, SheetHandle} from './Sheet.base';
import './Sheet.css';

export const Sheet = forwardRef<SheetHandle, SheetProps>((props, ref) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const controlled = props.open !== undefined;
  const open = controlled ? props.open : internalOpen;
  const onOpenChange = controlled ? props.onOpenChange : setInternalOpen;

  const backgroundColor = (props.backgroundColor ?? 'white') as React.CSSProperties['backgroundColor'];
  const grabberStyle = props.grabberProps ? {
    backgroundColor: props.grabberProps.color as React.CSSProperties['backgroundColor'],
    height: props.grabberProps.height ? `${props.grabberProps.height}px` : undefined,
    width: props.grabberProps.width ? `${props.grabberProps.width}px` : undefined,
    marginTop: props.grabberProps.topOffset ? `${props.grabberProps.topOffset}px` : undefined,
    display: props.grabberProps.visible === false ? 'none' : undefined,
  } : {};

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
      onOpenChange={onOpenChange}
      snapPoints={props.sizes ?? []}
      dismissible={props.dismissible}
      fadeFromIndex={props.dimmedIndex ?? 0}
      modal={props.dimmed ?? true}
    >
      {props.trigger && (
        <Drawer.Trigger asChild>
          {props.trigger}
        </Drawer.Trigger>
      )}
      <Drawer.Portal>
        <Drawer.Overlay className="sheet-overlay"/>
        <Drawer.Content className="sheet-content" style={{backgroundColor}}>
          <div className="sheet-main" style={{backgroundColor}}>
            {props.grabber && (
              <div className="sheet-handle" aria-hidden style={grabberStyle}/>
            )}
            <div className="sheet-content-wrapper">
              {props.children}
            </div>
          </div>
          {props.FooterComponent && (
            <div className="sheet-footer">
              <div className="sheet-footer-content">
                <>{props.FooterComponent}</>
              </div>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
});

Sheet.displayName = 'Sheet';
