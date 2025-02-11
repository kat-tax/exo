import {LegendList} from '@legendapp/list';
import {View} from 'react-native';
import {useRef} from 'react';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {ListEmpty} from 'media/stacks/list/empty';
import {ListBar} from 'media/stacks/list/bar';
import {HEIGHT} from 'media/stacks/list/row';

import type {LegendListRef} from '@legendapp/list';

export interface ListProps<T> {
  list?: T[];
  path?: string;
  ext?: unknown;
  bar?: {
    actions?: Array<{
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
  const listRef = useRef<LegendListRef>(null);
  const hasList = !!list?.length;
  const {styles} = useStyles(stylesheet);
  const {ref, focusKey} = useFocusable({
    isFocusBoundary: true,
    focusBoundaryDirections: ['up', 'down'],
    saveLastFocusedChild: !ext?.tmp,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <View ref={ref} style={styles.root}>
        {bar && <ListBar {...{path}} {...bar}/>}
        {!hasList
          ? <ListEmpty offset={bar ? -35 : 0}/>
          : (
            <LegendList
              ref={listRef}
              data={list}
              extraData={ext}
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