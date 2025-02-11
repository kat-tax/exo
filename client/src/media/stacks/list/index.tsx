import {View} from 'react-native';
import {LegendList} from '@legendapp/list';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {ListEmpty} from 'media/stacks/list/empty';
import {ListBar} from 'media/stacks/list/bar';
import {HEIGHT} from 'media/stacks/list/row';

export interface ListProps<T> {
  list?: T[];
  path?: string;
  ext?: any;
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
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      {bar && <ListBar {...{path}} {...bar}/>}
      {!list?.length 
        ? <ListEmpty offset={bar ? -35 : 0}/>
        : (
          <LegendList
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