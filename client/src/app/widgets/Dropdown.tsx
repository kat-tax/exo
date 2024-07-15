import * as Z from 'zeego/dropdown-menu';
import {useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Platform, StyleSheet} from 'react-native';
import type {ComponentProps} from 'react';

const itemHeight = 25;

export const CheckboxItem = Z.create((props: ComponentProps<typeof Z['CheckboxItem']>) => {
  const {styles} = useStyles(stylesheet);
  const [focused, setFocused] = useState(false);
  const focus = (next: boolean) => () => setFocused(next);
  return (
    <Z.CheckboxItem
      onFocus={focus(true)}
      onBlur={focus(false)}
      {...props}
      style={[styles.item, focused && styles.itemFocused]}
    />
  )
}, 'CheckboxItem');

export const Item = Z.create((props: ComponentProps<typeof Z['Item']>) => {
  const {styles} = useStyles(stylesheet);
  const [focused, setFocused] = useState(false);
  const focus = (next: boolean) => () => setFocused(next);
  return (
    <Z.Item 
      onFocus={focus(true)}
      onBlur={focus(false)}
      {...props}
      style={[styles.item, focused && styles.itemFocused]}
    />
  )
}, 'Item');

export const ItemIndicator = Z.create((props: ComponentProps<typeof Z['ItemIndicator']>) => {
  const {styles} = useStyles(stylesheet);
  return (
    <Z.ItemIndicator {...props} style={styles.itemIndicator}/>
  )
}, 'ItemIndicator');

export const ItemTitle = Z.create((props: ComponentProps<typeof Z['ItemTitle']>) => {
  const {styles} = useStyles(stylesheet);
  return (
    <Z.ItemTitle {...props} style={styles.itemTitle}/>
  )
}, 'ItemTitle');

export const ItemIcon = Z.create((props: ComponentProps<typeof Z['ItemIcon']>) => {
  const {styles} = useStyles(stylesheet);
  return (
    <Z.ItemIcon {...props} style={styles.itemIcon}/>
  )
}, 'ItemIcon');

export const ItemImage = Z.create((props: ComponentProps<typeof Z['ItemImage']>) => {
  const {styles} = useStyles(stylesheet);
  return (
    <Z.ItemImage {...props} style={styles.itemImage}/>
  )
}, 'ItemImage');

export const Separator = Z.create((props: ComponentProps<typeof Z['Separator']>) => {
  const {styles} = useStyles(stylesheet);
  return (
    <Z.Separator {...props} style={styles.separator} />
  )
}, 'Separator');

export const Arrow = Z.create((props: ComponentProps<typeof Z['Arrow']>) => {
  const {theme} = useStyles(stylesheet);
  return (
    <Z.Arrow {...props} style={{fill: theme.colors.mutedForeground}} />
  )
}, 'Arrow');

export const Trigger = Z.create((props: ComponentProps<typeof Z['Trigger']>) => {
  return (
    <Z.Trigger {...props}/>
  )
}, 'Trigger');

export const SubTrigger = Z.create((props: ComponentProps<typeof Z['SubTrigger']>) => {
  const {styles} = useStyles(stylesheet);
  const [focused, setFocused] = useState(false);
  const toggleFocus = (next: boolean) => () => setFocused(next)
  return (
    <Z.SubTrigger
      onFocus={toggleFocus(true)}
      onBlur={toggleFocus(false)}
      {...props}
      style={[styles.item, focused && styles.itemFocused]}
    />
  )
}, 'SubTrigger');

export const Content = Z.create((props: ComponentProps<typeof Z['Content']>) => {
  return (
    <Z.Content {...props}/>
  )
}, 'Content');

export const Label = Z.create((props: ComponentProps<typeof Z['Label']>) => {
  const {styles} = useStyles(stylesheet);
  return (
    <Z.Label {...props} style={styles.label} />
  )
}, 'Label');

export const Root = Z.create((props: ComponentProps<typeof Z['Root']>) => {
  return (
    <Z.Root {...props}/>
  )
}, 'Root');

export const stylesheet = createStyleSheet({
  content: {
    minWidth: 220,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
    borderWidth: 1,
    borderColor: '#fff8',
    ...Platform.select({
      web: {
        boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
        transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
        willChange: 'transform, opacity',
        animationDuration: '400ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        animationKeyframes: {
          '0%': {opacity: 0, transform: [{ scale: 0.5 }]},
          '100%': {opacity: 1, transform: [{ scale: 1 }]},
        },
      },
    }),
  },
  item: {
    borderRadius: 3,
    justifyContent: 'center',
    paddingRight: 5,
    paddingLeft: itemHeight,
    height: itemHeight,
    ...Platform.select({
      web: {
        transformOrigin: 'var(--radix-dropdown-menu-item-transform-origin)',
      },
    }),
  },
  itemWithSubtitle: {
    height: itemHeight * 2,
  },
  itemFocused: {
    // a nice background gray
    // a little darker
    backgroundColor: '#000fff30',
  },
  itemTitle: {
    fontSize: 13,
    lineHeight: 13,
    color: '#fff',
  },
  itemSubtitle: {
    fontSize: 10,
    lineHeight: 10,
  },
  itemIcon: {
    marginRight: 5,
    ...StyleSheet.absoluteFillObject,
    left: 'auto',
    justifyContent: 'center',
  },
  icon: {
    lineHeight: itemHeight,
  },
  separator: {
    backgroundColor: 'rgb(215, 207, 249)',
    height: 1,
    margin: 6,
  },
  itemIndicator: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    width: itemHeight,
    top: 0,
    bottom: 0,
  },
  itemImage: {
    width: itemHeight,
    height: 18,
    position: 'absolute',
    right: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {
    paddingLeft: itemHeight,
    lineHeight: itemHeight,
    fontSize: 12,
    color: '#555',
  },
});
