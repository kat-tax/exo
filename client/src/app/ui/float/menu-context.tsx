import * as Z from 'zeego/context-menu';
import {Icon} from 'react-exo/icon';
import {useStyles} from 'react-native-unistyles';

import type {ComponentProps} from 'react';

export interface MenuContextProps extends ComponentProps<typeof Z['Root']> {
  label: string,
  items: Array<MenuContextItem | undefined | false>,
}

export interface MenuContextItem {
  name: string,
  label: string,
  destructive?: boolean,
  shortcut?: string,
  icon?: string,
  action?: () => void,
}

export function MenuContext(props: MenuContextProps) {
  const {theme} = useStyles();
  const {label, items, children, ...rest} = props;
  return (
    <Root {...rest}>
      <Trigger>{children}</Trigger>
      <Content>
        <Label key="label">{label}</Label>
        {items.map(item => item && (
          item.label === '-' ? <Separator key={item.name} /> : (
          <Item
            key={item.name}
            onSelect={item.action}
            destructive={item.destructive}>
            {item.icon &&
              <ItemIcon>
                <Icon
                  size={14}
                  name={item.icon}
                  color={item.destructive
                    ? theme.colors.destructive
                    : theme.colors.primary}
                />
              </ItemIcon>
            }
            <ItemTitle>{item.label}</ItemTitle>
            {item.shortcut &&
              <ItemSubtitle>{item.shortcut}</ItemSubtitle>
            }
          </Item>
          )
        )).filter(Boolean)}
      </Content>
    </Root>
  )
}

export const Root = Z.create((props: ComponentProps<typeof Z['Root']>) => {
  return (
    <Z.Root {...props}/>
  )
}, 'Root');

export const Content = Z.create((props: ComponentProps<typeof Z['Content']>) => {
  return (
    <Z.Content className="ContextMenuContent context" {...props}/>
  )
}, 'Content');

export const Trigger = Z.create((props: ComponentProps<typeof Z['Trigger']>) => {
  return (
    <Z.Trigger className="ContextMenuTrigger context" {...props}/>
  )
}, 'Trigger');

export const Sub = Z.create((props: ComponentProps<typeof Z['Sub']>) => {
  return (
    <Z.Sub {...props}/>
  )
}, 'Sub');

export const SubContent = Z.create((props: ComponentProps<typeof Z['SubContent']>) => {
  return (
    <Z.SubContent className="ContextMenuSubContent context" {...props}/>
  )
}, 'SubContent');

export const SubTrigger = Z.create((props: ComponentProps<typeof Z['SubTrigger']>) => {
  return (
    <Z.SubTrigger className="ContextMenuSubTrigger context" {...props}/>
  )
}, 'SubTrigger');

export const Item = Z.create((props: ComponentProps<typeof Z['Item']>) => {
  return (
    <Z.Item className={`ContextMenuItem context ${props.destructive ? 'ContextMenuItemDestructive' : ''}`} {...props}/>
  )
}, 'Item');

export const ItemTitle = Z.create((props: ComponentProps<typeof Z['ItemTitle']>) => {
  return (
    <Z.ItemTitle className="ContextMenuItemTitle context" {...props}/>
  )
}, 'ItemTitle');

export const ItemSubtitle = Z.create((props: ComponentProps<typeof Z['ItemSubtitle']>) => {
  return (
    <Z.ItemSubtitle className="ContextMenuItemSubtitle context" {...props}/>
  )
}, 'ItemSubtitle');

export const ItemIcon = Z.create((props: ComponentProps<typeof Z['ItemIcon']>) => {
  return (
    <Z.ItemIcon className="ContextMenuItemIcon context" {...props}/>
  )
}, 'ItemIcon');

export const ItemImage = Z.create((props: ComponentProps<typeof Z['ItemImage']>) => {
  return (
    <Z.ItemImage className="ContextMenuItemImage context" {...props}/>
  )
}, 'ItemImage');

export const ItemIndicator = Z.create((props: ComponentProps<typeof Z['ItemIndicator']>) => {
  return (
    <Z.ItemIndicator className="ContextMenuItemIndicator context" {...props}/>
  )
}, 'ItemIndicator');

export const Arrow = Z.create((props: ComponentProps<typeof Z['Arrow']>) => {
  return (
    <Z.Arrow className="ContextMenuArrow context" {...props}/>
  )
}, 'Arrow');

export const Label = Z.create((props: ComponentProps<typeof Z['Label']>) => {
  return (
    <Z.Label className="ContextMenuLabel context" {...props}/>
  )
}, 'Label');

export const Separator = Z.create((props: ComponentProps<typeof Z['Separator']>) => {
  return (
    <Z.Separator className="ContextMenuSeparator context" {...props}/>
  )
}, 'Separator');

export const CheckboxItem = Z.create((props: ComponentProps<typeof Z['CheckboxItem']>) => {
  return (
    <Z.CheckboxItem className="ContextMenuCheckboxItem context" {...props}/>
  )
}, 'CheckboxItem');
