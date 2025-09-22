import {Drawer} from 'vaul';
import {cloneElement, forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import {SheetProps, SheetHandle, DEFAULT_SIZES} from './Sheet.base';

import './Sheet.css';

export const Sheet = forwardRef<SheetHandle, SheetProps>((props, ref) => {
  const [snap, setSnap] = useState<number | string | null>(DEFAULT_SIZES[0]);
  const [internalOpen, setInternalOpen] = useState(false);
  const snapPoints = useMemo(() => {
    const points = props.sizes ?? DEFAULT_SIZES;
    const newPoints = points.map((point) => {
      // Convert special values to decimal
      if (point === 'auto') return 0.3; // TODO: implement "auto" in vaul
      if (point === 'small') return 0.3;
      if (point === 'medium') return 0.8;
      if (point === 'large') return 1;
      // Convert number to pixel (implied on native, needed on web)
      if (typeof point === 'number') {
        return `${point}px`;
      }
      // Convert percentage to decimal (vaul expects decimal)
      return parseFloat(point) / 100;
    });
    setSnap(newPoints[0]);
    return newPoints;
  }, [props.sizes]);

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
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      dismissible={props.dismissible}
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
              {props.FooterComponent && (
                <div className="sheet-footer">
                  <>{props.FooterComponent}</>
                </div>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
});

Sheet.displayName = 'Sheet';
