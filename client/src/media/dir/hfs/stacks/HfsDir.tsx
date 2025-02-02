import {LegendList} from '@legendapp/list';
// import {HfsNoEntries} from 'media/dir/hfs/stacks/HfsNoEntries';
import {HfsEntry} from 'media/dir/hfs/stacks/HfsEntry';
import {HEIGHT} from 'media/stacks/ListRow';
import type {HfsCtx} from '../types';

export function HfsDir({hfs, cmd, ext}: HfsCtx) {
  return (
    <LegendList
      data={hfs.list}
      extraData={ext}
      recycleItems
      drawDistance={HEIGHT * 20}
      estimatedItemSize={HEIGHT}
      contentContainerStyle={{marginHorizontal: 1}}
      keyExtractor={(_,i) => i.toString()}
      // ListEmptyComponent={HfsNoEntries}
      renderItem={({item, index}) => {
        const path = hfs.path ? `${hfs.path}/${item.name}` : item.name;
        const prev = hfs.list[index - 1];
        const next = hfs.list[index + 1];
        const opt = {
          dragging: ext.dnd?.includes(path),
          selected: ext.sel?.includes(path),
          selectedPrev: ext.sel?.includes(hfs.path ? `${hfs.path}/${prev?.name}` : prev?.name),
          selectedNext: ext.sel?.includes(hfs.path ? `${hfs.path}/${next?.name}` : next?.name),
        };
        return (
          <HfsEntry idx={index} entry={item} {...{cmd, opt}}/>
        );
      }}
    />
  );
}
