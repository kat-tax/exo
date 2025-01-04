import * as Z from 'zeego/context-menu';
import type {ComponentProps} from 'react';

export const Root = Z.create((props: ComponentProps<typeof Z['Root']>) => {
  return (
    <Z.Root {...props}/>
  )
}, 'Root');

export const Content = Z.create((props: ComponentProps<typeof Z['Content']>) => {
  return (
    <Z.Content className="ContextMenuContent" {...props}/>
  )
}, 'Content');

export const Trigger = Z.create((props: ComponentProps<typeof Z['Trigger']>) => {
  return (
    <Z.Trigger className="ContextMenuTrigger" {...props}/>
  )
}, 'Trigger');

export const SubTrigger = Z.create((props: ComponentProps<typeof Z['SubTrigger']>) => {
  return (
    <Z.SubTrigger className="ContextMenuSubTrigger" {...props}/>
  )
}, 'SubTrigger');

export const Item = Z.create((props: ComponentProps<typeof Z['Item']>) => {
  return (
    <Z.Item className={`ContextMenuItem ${props.destructive ? 'ContextMenuItemDestructive' : ''}`} {...props}/>
  )
}, 'Item');

export const ItemTitle = Z.create((props: ComponentProps<typeof Z['ItemTitle']>) => {
  return (
    <Z.ItemTitle className="ContextMenuItemTitle" {...props}/>
  )
}, 'ItemTitle');

export const ItemSubtitle = Z.create((props: ComponentProps<typeof Z['ItemSubtitle']>) => {
  return (
    <Z.ItemSubtitle className="ContextMenuItemSubtitle" {...props}/>
  )
}, 'ItemSubtitle');
export const ItemIcon = Z.create((props: ComponentProps<typeof Z['ItemIcon']>) => {
  return (
    <Z.ItemIcon className="ContextMenuItemIcon" {...props}/>
  )
}, 'ItemIcon');

export const ItemImage = Z.create((props: ComponentProps<typeof Z['ItemImage']>) => {
  return (
    <Z.ItemImage className="ContextMenuItemImage" {...props}/>
  )
}, 'ItemImage');

export const ItemIndicator = Z.create((props: ComponentProps<typeof Z['ItemIndicator']>) => {
  return (
    <Z.ItemIndicator className="ContextMenuItemIndicator" {...props}/>
  )
}, 'ItemIndicator');

export const Arrow = Z.create((props: ComponentProps<typeof Z['Arrow']>) => {
  return (
    <Z.Arrow className="ContextMenuArrow" {...props}/>
  )
}, 'Arrow');

export const Label = Z.create((props: ComponentProps<typeof Z['Label']>) => {
  return (
    <Z.Label className="ContextMenuLabel" {...props}/>
  )
}, 'Label');

export const Separator = Z.create((props: ComponentProps<typeof Z['Separator']>) => {
  return (
    <Z.Separator className="ContextMenuSeparator" {...props}/>
  )
}, 'Separator');

export const CheckboxItem = Z.create((props: ComponentProps<typeof Z['CheckboxItem']>) => {
  return (
    <Z.CheckboxItem className="ContextMenuCheckboxItem" {...props}/>
  )
}, 'CheckboxItem');
