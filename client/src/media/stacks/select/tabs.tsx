import {ScrollView} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useRef, useEffect} from 'react';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useComposedRefs} from 'app/lib/components';
import {useGet} from 'app/data';
import media from 'media/store';

import {SelectItem} from './item';

interface SelectTabsProps {
  routePath: string;
}

export function SelectTabs(props: SelectTabsProps) {
  const scroll = useRef<ScrollView>(null);
  const focused = useGet(media.selectors.getFocused);
  const selection = useGet(media.selectors.getSelected);
  const {ref, focusKey} = useFocusable({
    //preferredChildFocusKey: `select@${focused}`,
    saveLastFocusedChild: false,
  });

  const refs = useComposedRefs(ref, scroll);

  // Scroll to focus
  useEffect(() => {
    const index = selection.findIndex(item => item === focused);
    if (index > -1) {
      scroll.current?.scrollTo({x: index * 100, animated: true});
    }
  }, [focused]);

  return (
    <FocusContext.Provider value={focusKey}>
      <ScrollView
        horizontal
        ref={refs}
        style={styles.root}
        contentContainerStyle={styles.inner}
        showsHorizontalScrollIndicator={false}>
        {selection.length === 0 &&
          <SelectItem
            index={-1}
            path={props.routePath}
            focused
          />
        }
        {selection.map((path, index) => (
          <SelectItem
            key={path}
            path={path}
            index={index}
            focused={focused === path}
          />
        ))}
      </ScrollView>
    </FocusContext.Provider>
  );
}


const styles = StyleSheet.create((theme) => ({
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
