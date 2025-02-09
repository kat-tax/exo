import {View} from 'react-native';
import {LegendList} from '@legendapp/list';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {HfsNoEntries} from 'media/dir/hfs/stacks/HfsNoEntries';
import {HfsEntry} from 'media/dir/hfs/stacks/HfsEntry';
import {ListBar} from 'media/stacks/ListBar';
import {HEIGHT} from 'media/stacks/ListRow';
import type {HfsCtx} from '../types';

export function HfsDir({hfs, cmd, ext, bar}: HfsCtx) {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <ListBar
        path={hfs.path}
        actions={[
          {icon: 'ph:plus', onPress: () => {}},
          {icon: 'ph:faders', onPress: () => {}},
          {icon: 'ph:squares-four', onPress: () => {}},
        ]}
        {...bar}
      />
      <LegendList
        data={hfs.list}
        extraData={ext}
        recycleItems
        drawDistance={HEIGHT * 20}
        estimatedItemSize={HEIGHT}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<View style={styles.listHeader}/>}
        keyExtractor={(_,i) => i.toString()}
        ListEmptyComponent={HfsNoEntries}
        renderItem={({item, index}) => {
          const path = hfs.path ? `${hfs.path}/${item.name}` : item.name;
          const prev = hfs.list[index - 1];
          const next = hfs.list[index + 1];
          const opt = {
            dragging: ext.dnd?.includes(path),
            selected: {
              self: ext.sel?.includes(path),
              prev: ext.sel?.includes(hfs.path ? `${hfs.path}/${prev?.name}` : prev?.name),
              next: ext.sel?.includes(hfs.path ? `${hfs.path}/${next?.name}` : next?.name),
              count: ext.sel?.length,
            },
          };
          return (
            <HfsEntry idx={index} entry={item} {...{cmd, opt}}/>
          );
        }}
      />
    </View>
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
  listHeader: {
    height: theme.display.space2,
  },
}));
