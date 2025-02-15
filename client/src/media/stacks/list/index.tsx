import {View} from 'react-native';
import {LegendList} from '@legendapp/list';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions} from 'react-native';
import {useRef} from 'react';
// import {useGet} from 'app/data/store';
import {ListBar} from 'media/stacks/list/bar';
import {ListEmpty} from 'media/stacks/list/empty';
import {HEIGHT_ROW, HEIGHT_CELL} from 'media/stacks/list/row';
// import media from 'media/store';

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
  //const layout = useGet(media.selectors.getLayout);
  const {width} = useWindowDimensions();
  const layout = !ext?.tmp ? 'list' : 'grid';
  const height = layout === 'list' ? HEIGHT_ROW : HEIGHT_CELL;
  const columns = layout === 'grid' ? Math.floor(width / (HEIGHT_CELL * 1.15)) : 1;
  const listRef = useRef<LegendListRef>(null);
  const {styles} = useStyles(stylesheet);
  const {ref, focusKey} = useFocusable({
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
              key={`${layout}:${columns}`}
              ref={listRef}
              data={list}
              extraData={ext}
              numColumns={columns}
              drawDistance={height * 20}
              estimatedItemSize={height}
              contentContainerStyle={[styles.list, layout === 'grid' && styles.grid]}
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
    paddingHorizontal: theme.display.space1,
    paddingBottom: theme.display.space1,
  },
  grid: {
    paddingHorizontal: theme.display.space2,
    paddingBottom: theme.display.space2,
  },
  header: {
    height: theme.display.space1,
  },
})); 