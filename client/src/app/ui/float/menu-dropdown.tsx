import * as Z from 'zeego/dropdown-menu';
import {Icon} from 'react-exo/icon';
import {useStyles} from 'react-native-unistyles';

import type {ComponentProps} from 'react';

export interface MenuDropdownProps extends ComponentProps<typeof Z['Root']> {
  label: string,
  items: Array<MenuDropdownItem | undefined | false>,
}

export interface MenuDropdownItem {
  name: string,
  label: string,
  destructive?: boolean,
  shortcut?: string,
  icon?: string,
  sub?: Array<MenuDropdownItem>,
  action?: () => void,
}

export function MenuDropdown(props: MenuDropdownProps) {
  const {theme} = useStyles();
  const {label, items, children, ...rest} = props;
  return (
    <Root {...rest}>
      <Trigger>{children}</Trigger>
      <Content>
        {items.map(item => item && (
          item.label === '-'
            ? <Separator key={item.name} />
            : item.sub
              ? <Sub>
                  <SubTrigger key={item.name}>
                    {item.icon &&
                      <ItemIcon>
                        <Icon size={14} name={item.icon} color={item.destructive ? theme.colors.destructive : theme.colors.primary}/>
                      </ItemIcon>
                    }
                    <ItemTitle>{item.label}</ItemTitle>
                    <div className="RightSlot">
                      <Icon name="ph:caret-right" size={12} color={theme.colors.mutedForeground}/>
                    </div>
                    {item.shortcut &&
                      <ItemSubtitle>{item.shortcut}</ItemSubtitle>
                    }
                  </SubTrigger>
                  <SubContent>
                    {item.sub.map(sub => sub && (
                      <Item key={sub.name} onSelect={sub.action} destructive={sub.destructive}>
                        {sub.icon &&
                          <ItemIcon>
                            <Icon size={14} name={sub.icon} color={sub.destructive ? theme.colors.destructive : theme.colors.primary}/>
                          </ItemIcon>
                        }
                        <ItemTitle>{sub.label}</ItemTitle>
                        {sub.shortcut &&
                          <ItemSubtitle>{sub.shortcut}</ItemSubtitle>
                        }
                      </Item>
                    ))}
                  </SubContent>
                </Sub>
              : <Item key={item.name} onSelect={item.action} destructive={item.destructive}>
                  {item.icon &&
                    <ItemIcon>
                      <Icon size={14} name={item.icon} color={item.destructive ? theme.colors.destructive : theme.colors.primary}/>
                    </ItemIcon>
                  }
                  <ItemTitle>{item.label}</ItemTitle>
                  {item.shortcut &&
                    <ItemSubtitle>{item.shortcut}</ItemSubtitle>
                  }
                </Item>
        )).filter(Boolean)}
        <Arrow />
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
    <Z.Content className="ContextMenuContent" {...props}/>
  )
}, 'Content');

export const Trigger = Z.create((props: ComponentProps<typeof Z['Trigger']>) => {
  return (
    <Z.Trigger className="ContextMenuTrigger" {...props}/>
  )
}, 'Trigger');

export const Sub = Z.create((props: ComponentProps<typeof Z['Sub']>) => {
  return (
    <Z.Sub {...props}/>
  )
}, 'Sub');

export const SubContent = Z.create((props: ComponentProps<typeof Z['SubContent']>) => {
  return (
    <Z.SubContent className="ContextMenuSubContent" {...props}/>
  )
}, 'SubContent');

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
