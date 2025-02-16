import {View} from 'react-native';
import {LegendList} from '@legendapp/list';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions} from 'react-native';
import {useRef} from 'react';
import {ListBar} from 'media/stacks/list/bar';
import {ListEmpty} from 'media/stacks/list/empty';
import {HEIGHT_ROW, HEIGHT_CELL} from 'media/stacks/list/row';

import type {LegendListRef} from '@legendapp/list';

export interface ListProps<T> {
  items?: T[];
  data?: unknown;
  opts?: {
    preview?: boolean,
    layout?: 'list' | 'grid',
    header?: {
      path: string,
      actions?: Array<{id: string, icon: string, onPress: () => void}>,
    },
  };
  render: (props: {
    item: T,
    index: number,
  }) => React.ReactNode;
}

export function List<T>({items, data, opts, render}: ListProps<T>) {
  const {ref, focusKey} = useFocusable({saveLastFocusedChild: !opts?.preview});
  const {styles} = useStyles(stylesheet);
  const {width} = useWindowDimensions();
  const listRef = useRef<LegendListRef>(null);
  const layout = opts?.layout ?? 'list';
  const isGrid = layout === 'grid';
  const height = isGrid ? HEIGHT_CELL : HEIGHT_ROW;
  const columns = isGrid ? Math.floor(width / (HEIGHT_CELL * 1.15)) : 1;

  return (
    <FocusContext.Provider value={focusKey}>
      <View ref={ref} style={styles.root}>
        {opts?.header && <ListBar {...opts.header}/>}
        {!items?.length
          ? <ListEmpty offset={opts?.header ? -35 : 0}/>
          : (
            <LegendList
              key={`${layout}:${columns}`}
              ref={listRef}
              data={items}
              extraData={data}
              numColumns={columns}
              drawDistance={height * 20}
              estimatedItemSize={height}
              contentContainerStyle={[styles.list, isGrid && styles.grid]}
              ListHeaderComponent={opts?.header ? <View style={styles.header}/> : null}
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
