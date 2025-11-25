import {View} from 'react-native';
import {LegendList} from '@legendapp/list';
import {StyleSheet} from 'react-native-unistyles';
import {useRef, useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {HEIGHT_ROW, HEIGHT_CELL} from 'media/stacks/list/row';
import {ListEmpty} from 'media/stacks/list/empty';
import {ListBar} from 'media/stacks/list/bar';
import {MenuContext} from 'app/ui/float';

import type {LegendListRef} from '@legendapp/list';
import type {ListBarAction} from 'media/stacks/list/bar';
import type {MenuContextItem} from 'app/ui/float/menu-context';
import type {DeviceId} from 'app/data/types';

export interface ListProps<T> {
  items?: Array<T>;
  paths?: Array<[path: string, name: string]>;
  data?: unknown;
  opts?: {
    deviceId?: DeviceId | null;
    deviceName?: string | null;
    preview?: boolean,
    layout?: 'list' | 'grid',
    menu?: Array<MenuContextItem>,
    header?: {
      actions?: Array<ListBarAction>,
    },
  };
  render: (props: {
    item: T,
    index: number,
  }) => React.ReactNode;
}

export function List<T>({items, paths, data, opts, render}: ListProps<T>) {
  const {ref, focusKey} = useFocusable({saveLastFocusedChild: !opts?.preview});
  const {width} = useWindowDimensions();
  const listRef = useRef<LegendListRef>(null);
  const [,name] = paths?.at(-1) ?? [null,'Files'];
  const layout = opts?.layout ?? 'list';
  const isGrid = layout === 'grid';
  const height = isGrid ? HEIGHT_CELL : HEIGHT_ROW;
  const columns = isGrid ? Math.floor(width / (HEIGHT_CELL * 1.15)) : 1;
  const vstyles = useMemo(() => ({
    root: [
      styles.root,
      isGrid && styles.grid,
    ],
    list: [
      styles.list,
      isGrid && styles.grid,
    ],
    header: [
      styles.header,
      isGrid && styles.headerGrid,
    ],
  }), [isGrid, styles]);

  return (
    <FocusContext.Provider value={focusKey}>
      <MenuContext
        label={name}
        items={opts?.menu ?? []}
        enabled={!!opts?.menu}>
        <View ref={ref} style={vstyles.root}>
          {opts?.header &&
            <ListBar
              paths={paths}
              deviceId={opts?.deviceId}
              deviceName={opts?.deviceName}
              {...opts.header}
            />
          }
          <View style={vstyles.list}>
            {!items?.length
              ? <ListEmpty
                  path={paths?.map(p => p[0]).join('/')}
                  offset={opts?.header ? 100 : 0}
                />
              : (
                <LegendList
                  key={`${layout}:${columns}`}
                  ref={listRef}
                  style={{paddingBottom: 2}}
                  data={items}
                  extraData={data}
                  numColumns={columns}
                  drawDistance={height * 50}
                  estimatedItemSize={height}
                  getFixedItemSize={() => height}
                  getEstimatedItemSize={() => height}
                  ListHeaderComponent={opts?.header ? <View style={vstyles.header}/> : null}
                  keyExtractor={(_,i) => i.toString()}
                  renderItem={render}
                  recycleItems
                />
              )
            }
          </View>
        </View>
      </MenuContext>
    </FocusContext.Provider>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    flex: 1,
  },
  list: {
    flex: 1,
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
  headerGrid: {
    height: theme.display.space2,
  },
}));
