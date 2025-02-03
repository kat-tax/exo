import {useRef, useMemo, useCallback, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useSelector, useDispatch} from 'react-redux';
import {Text, Pressable} from 'react-native';
import {Icon} from 'react-exo/icon';
import {Motion} from 'react-exo/motion';
import {isTouch} from 'app/utils/platform';
import {ListRowIcon} from 'media/stacks/ListRowIcon';
import {toPathInfo} from 'app/utils/formatting';
import media from 'media/store';

import type {ScrollView} from 'react-native';

const TOUCH = isTouch();
const TAB_SIZE = TOUCH ? 46 : 32;
const ICON_SIZE = TOUCH ? 1 : 0;
const TEXT_LINES = TOUCH ? 2 : 1;

export function MediaSelection() {
  const {styles, theme} = useStyles(stylesheet);
  const scrollRef = useRef<ScrollView>(null);
  const selection = useSelector(media.selectors.getSelected);
  const focused = useSelector(media.selectors.getFocused);
  const put = useDispatch();

  const list = useMemo(() => {
    return selection.map(selectItem => {
      const {path, name, ext} = toPathInfo(selectItem, false);
      return {path, name, ext};
    });
  }, [selection]);

  const goto = useCallback((delta: number | 'start' | 'end') => {
    const path = selection[typeof delta === 'number'
      ? (selection.indexOf(focused) + delta + selection.length) % selection.length
      : delta === 'start'
        ? 0
        : selection.length - 1];
    if (path) put(media.actions.focus(path));
  }, [selection, focused]);

  const close = useCallback((index: number) => {
    put(media.actions.selectRemove(index));
  }, [put]);

  // Scroll to focus
  useEffect(() => {
    const index = list.findIndex(item => item.path === focused);
    if (index > -1) {
      scrollRef.current?.scrollTo({x: index * 100, animated: true});
    }
  }, [focused, list]);

  // Hotkeys
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const {key} = e;
      switch (key) {
        case 'ArrowLeft':
          goto(e.shiftKey ? 'start' : -1);
          break;
        case 'ArrowRight':
          goto(e.shiftKey ? 'end' : 1);
          break;
        case 'Escape':
          put(media.actions.selectBulk([]));
          break;
      }
    };
    window.addEventListener('keydown', down);
    return () => {
      window.removeEventListener('keydown', down);
    };
  }, [goto, put]);

  return list.length > 0 ? (
    <Motion.ScrollView
      horizontal
      ref={scrollRef}
      style={styles.root}
      contentContainerStyle={styles.inner}
      showsHorizontalScrollIndicator={false}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      {list.map(({path, name, ext}, index) => 
        <Pressable
          key={path}
          onPress={() => put(media.actions.focus(path))}
          style={[styles.preview, path === focused && styles.focus]}>
          <ListRowIcon
            name={name ?? ''}
            size={ICON_SIZE}
            ext={ext}
            dir={false}
          />
          <Text
            style={[styles.text, path === focused && styles.textFocused]}
            selectable={false}
            numberOfLines={TEXT_LINES}>
            {name || `.${ext}`}
          </Text>
          <Pressable onPress={() => close(index)}>
            <Icon
              name="ph:x"
              size={TOUCH ? 16 : 14}
              color={theme.colors.mutedForeground}
            />
          </Pressable>
        </Pressable>
      )}
    </Motion.ScrollView>
  ) : null;
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flexGrow: 0,
    flexShrink: 0,
  },
  inner: {
    flexDirection: 'row',
    gap: theme.display.space2,
    padding: theme.display.space2,
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
