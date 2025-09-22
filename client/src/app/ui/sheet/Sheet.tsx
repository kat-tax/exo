import {Drawer} from 'vaul';
import {cloneElement, forwardRef, useImperativeHandle, useState} from 'react';
import {SheetProps, SheetHandle} from './Sheet.base';
import './Sheet.css';

const DEFAULT_SNAP_POINTS = [0.3, 0.8, 1];

export const Sheet = forwardRef<SheetHandle, SheetProps>((props, ref) => {
  const [snap, setSnap] = useState<number | string | null>(DEFAULT_SNAP_POINTS[0]);
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
      snapPoints={DEFAULT_SNAP_POINTS}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      dismissible={props.dismissible}
      //repositionInputs={false}
      fadeFromIndex={props.dimmedIndex ?? 0}
      modal={props.dimmed ?? true}>
      {props.trigger && (
        <Drawer.Trigger asChild>
          {cloneElement(props.trigger as any, {
            onPress: () => onOpenChange?.(true),
          })}
        </Drawer.Trigger>
      )}
      <Drawer.Portal>
        <Drawer.Title>{props.title}</Drawer.Title>
        <Drawer.Description>{props.description}</Drawer.Description>
        <Drawer.Overlay className="sheet-overlay"/>
        <Drawer.Content className="sheet-content" style={{backgroundColor}}>
          <div className="sheet-main" style={{backgroundColor}}>
            {props.grabber !== false && (
              <Drawer.Handle className="sheet-handle" style={grabberStyle}/>
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
