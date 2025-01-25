import {LegendList} from '@legendapp/list';
import {HfsNoEntries} from 'media/dir/hfs/stacks/HfsNoEntries';
import {HfsEntry} from 'media/dir/hfs/stacks/HfsEntry';
import {HEIGHT} from 'media/stacks/ListRow';
import type {HfsCtx} from '../types';

export function HfsDir({hfs, cmd, sel}: HfsCtx) {
  return (
    <LegendList
      data={hfs.list}
      recycleItems
      drawDistance={HEIGHT * 20}
      estimatedItemSize={HEIGHT}
      keyExtractor={(_,i) => i.toString()}
      ListEmptyComponent={HfsNoEntries}
      renderItem={({item, index}) => {
        const path = hfs.path ? `${hfs.path}/${item.name}` : item.name;
        const opt = {selected: sel?.includes(path)};
        return (
          <HfsEntry idx={index} entry={item} {...{cmd, opt}}/>
        );
      }}
    />
  );
}
