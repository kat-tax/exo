import {useRef, useMemo, useCallback, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useSelector, useDispatch} from 'react-redux';
import {Motion} from 'react-exo/motion';
import {toPathInfo} from 'app/utils/formatting';
import media from 'media/store';

import {MediaSelectionItem} from './selection-item';

import type {ScrollView} from 'react-native';
import type {HfsImpl} from 'react-exo/fs';

interface MediaSelectionProps {
  hfs: HfsImpl | null,
}

export function MediaSelection({hfs}: MediaSelectionProps) {
  const {styles} = useStyles(stylesheet);
  const scrollRef = useRef<ScrollView>(null);
  const selection = useSelector(media.selectors.getSelected);
  const focused = useSelector(media.selectors.getFocused);
  const list = useMemo(() => selection.map(selectItem => {
    const {path, name, ext} = toPathInfo(selectItem, false);
    return {path, name, ext};
  }), [selection]);

  const put = useDispatch();
  const goto = useCallback((delta: number | 'start' | 'end') => {
    const path = selection[typeof delta === 'number'
      ? (selection.indexOf(focused) + delta + selection.length) % selection.length
      : delta === 'start'
        ? 0
        : selection.length - 1];
    if (path) put(media.actions.focus(path));
  }, [selection, focused]);

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
      {list.map(({path, name, ext}, index) => (
        <MediaSelectionItem
          key={path}
          hfs={hfs}
          focused={focused === path}
          index={index}
          path={path}
          name={name}
          ext={ext}
        />
      ))}
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
}));
