import {useRef, useEffect, useMemo} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Text, Pressable} from 'react-native';
import {Icon} from 'react-exo/icon';
import {Motion} from 'react-exo/motion';
import {isTouch} from 'app/utils/platform';
import {ListRowIcon} from 'media/stacks/ListRowIcon';
import {EntryHfsMenu} from 'media/dir/EntryHfsMenu';

import type {ScrollView} from 'react-native';
import type {MediaSelection as MediaSelectionType} from 'media/hooks/useMediaSelection';

const TOUCH = isTouch();
const TAB_SIZE = TOUCH ? 46 : 32;
const ICON_SIZE = TOUCH ? 1 : 0;
const TEXT_LINES = TOUCH ? 2 : 1;

export function MediaSelection(props: {maximized: boolean} & MediaSelectionType) {
  const {queue, focus} = props;
  const {styles, theme} = useStyles(stylesheet);
  const scrollRef = useRef<ScrollView>(null);

  // Handlers for menu actions
  const actions = useMemo(() => ({
    menu: () => {},
    view: () => {},
    share: () => {},
    copy: () => {},
    move: () => {},
    rename: () => {},
    delete: () => {},
  }), []);

  // Scroll to focus
  useEffect(() => {
    if (focus >= queue.length - 1) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({animated: true});
      }, 100);
    } else {
      scrollRef.current?.scrollTo({x: focus * 100, animated: true});
    }
  }, [focus, queue]);

  return (
    <Motion.ScrollView
      horizontal
      ref={scrollRef}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.root, !props.maximized && styles.floating]}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      {queue.map(({name, title, ext, action}, index) => 
        <EntryHfsMenu {...{name, actions}} key={name}>
          <Pressable
            onPress={action}
            style={[styles.preview, index === focus && styles.focus]}>
            <ListRowIcon
              name={name ?? ''}
              extension={ext}
              size={ICON_SIZE}
              isFile
            />
            <Text
              style={[styles.text, index === focus && styles.textFocused]}
              selectable={false}
              numberOfLines={TEXT_LINES}>
              {title}
            </Text>
            <Pressable onPress={() => props.remove(index)}>
              <Icon
                name="ph:x"
                size={TOUCH ? 16 : 14}
                color={theme.colors.mutedForeground}
              />
            </Pressable>
          </Pressable>
        </EntryHfsMenu>
      )}
    </Motion.ScrollView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flexDirection: 'row',
    gap: theme.display.space2,
    padding: theme.display.space2,
  },
  floating: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  preview: {
    height: TAB_SIZE,
    gap: TOUCH ? theme.display.space3 : theme.display.space2,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: theme.display.space1,
    paddingHorizontal: TOUCH ? theme.display.space3 : theme.display.space2,
    borderRadius: theme.display.radius1,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  focus: {
    borderColor: theme.colors.primary,
  },
  text: {
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.mutedForeground,
  },
  textFocused: {
    color: theme.colors.foreground,
  },
}));
