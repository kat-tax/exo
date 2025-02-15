import {Motion} from 'react-exo/motion';
import {useRef, useMemo, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useComposedRefs} from 'app/utils/components';
import {useGet} from 'app/data/store';
import {toPath} from 'app/utils/formatting';
import media from 'media/store';

import {SelectItem} from './item';

import type {ScrollView} from 'react-native';
import type {HfsImpl} from 'react-exo/fs';

interface SelectTabsProps {
  hfs: HfsImpl | null,
  path: string,
  name: string,
  ext: string,
}

export function SelectTabs({hfs, path, name, ext}: SelectTabsProps) {
  const scroll = useRef<ScrollView>(null);
  const {styles} = useStyles(stylesheet);
  const selection = useGet(media.selectors.getSelected);
  const focused = useGet(media.selectors.getFocused);
  const list = useMemo(() => selection.map(selectItem => {
    const {path, name, ext} = toPath(selectItem, false);
    return {path, name, ext};
  }), [selection]);

  const {ref, focusKey} = useFocusable({
    preferredChildFocusKey: `select@${focused}`,
    saveLastFocusedChild: false,
  });
  
  const refs = useComposedRefs(ref, scroll);

  // Scroll to focus
  useEffect(() => {
    const index = list.findIndex(item => item.path === focused);
    if (index > -1) {
      scroll.current?.scrollTo({x: index * 100, animated: true});
    }
  }, [focused, list]);

  return (
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
        {list?.length === 0 &&
          <SelectItem
            focused
            index={-1}
            {...{hfs, path, name, ext}}
          />
        }
        {list?.map(({path, name, ext}, index) => (
          <SelectItem
            key={path}
            focused={focused === path}
            {...{hfs, path, name, ext, index}}
          />
        ))}
      </Motion.ScrollView>
    </FocusContext.Provider>
  );
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
