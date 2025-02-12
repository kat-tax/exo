import {LegendList} from '@legendapp/list';
import {View} from 'react-native';
import {useRef} from 'react';
import {useSelector} from 'react-redux';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {ListEmpty} from 'media/stacks/list/empty';
import {ListBar} from 'media/stacks/list/bar';
import {HEIGHT} from 'media/stacks/list/row';
import media from 'media/store';

import type {LegendListRef} from '@legendapp/list';

export interface ListProps<T> {
  list?: T[];
  path?: string;
  ext?: unknown;
  bar?: {
    actions?: Array<{
      id: string,
      icon: string,
      onPress: () => void,
    }>;
  },
  render: (props: {
    item: T,
    index: number,
  }) => React.ReactNode;
}

export function List<T>({path, list, ext, bar, render}: ListProps<T>) {
  const layout = useSelector(media.selectors.getLayout);
  const listRef = useRef<LegendListRef>(null);
  const {styles} = useStyles(stylesheet);
  const {ref, focusKey} = useFocusable({
    isFocusBoundary: true,
    focusBoundaryDirections: ['up', 'down'],
    saveLastFocusedChild: !ext?.tmp, // TODO: type ext
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <View ref={ref} style={styles.root}>
        {bar && <ListBar {...{path}} {...bar}/>}
        {!list?.length
          ? <ListEmpty offset={bar ? -35 : 0}/>
          : (
            <LegendList
              key={layout}
              ref={listRef}
              data={list}
              extraData={ext}
              numColumns={layout === 'grid' ? 3 : 1}
              drawDistance={HEIGHT * 20}
              estimatedItemSize={HEIGHT}
              contentContainerStyle={styles.list}
              ListHeaderComponent={bar ? <View style={styles.header}/> : null}
              keyExtractor={(_,i) => i.toString()}
              renderItem={render}
              recycleItems
            />
          )
        }
      </View>
    </FocusContext.Provider>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
  },
  list: {
    paddingHorizontal: theme.display.space2,
    paddingBottom: theme.display.space2,
  },
  header: {
    height: theme.display.space2,
  },
})); 