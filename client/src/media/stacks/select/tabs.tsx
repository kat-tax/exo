import {Motion} from 'react-exo/motion';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useRef, useMemo, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useComposedRefs} from 'app/utils/components';
import {toPathInfo} from 'app/utils/formatting';
import media from 'media/store';

import {SelectItem} from './item';

import type {ScrollView} from 'react-native';
import type {HfsImpl} from 'react-exo/fs';

interface SelectTabsProps {
  hfs: HfsImpl | null,
}

export function SelectTabs({hfs}: SelectTabsProps) {
  const {styles} = useStyles(stylesheet);
  const scrollRef = useRef<ScrollView>(null);
  const selection = useSelector(media.selectors.getSelected);
  const focused = useSelector(media.selectors.getFocused);
  const list = useMemo(() => selection.map(selectItem => {
    const {path, name, ext} = toPathInfo(selectItem, false);
    return {path, name, ext};
  }), [selection]);

  const {ref, focusKey} = useFocusable({
    isFocusBoundary: true,
    focusBoundaryDirections: ['up', 'down'],
    forceFocus: true,
  });
  
  const put = useDispatch();
  const refs = useComposedRefs(ref, scrollRef);

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
        case 'Escape':
          put(media.actions.selectBulk([]));
          break;
      }
    };
    window.addEventListener('keydown', down);
    return () => {
      window.removeEventListener('keydown', down);
    };
  }, [put]);

  return list.length > 0 ? (
    <FocusContext.Provider value={focusKey}>
      <Motion.ScrollView
        horizontal
        ref={refs}
        style={styles.root}
        contentContainerStyle={styles.inner}
        showsHorizontalScrollIndicator={false}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}>
        {list.map(({path, name, ext}, index) => (
          <SelectItem
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
    </FocusContext.Provider>
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
