import {List} from 'media/stacks/list';
import {EntryHfs} from 'media/dir/stacks/entry-hfs';
import type {HfsCtx} from 'media/dir/types/hfs';

export function DirHfs({hfs, cmd, ext, bar}: HfsCtx) {
  return (
    <List
      ext={ext}
      bar={bar}
      path={hfs.path}
      data={hfs.list || []}
      render={({item, index}) => {
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
          <EntryHfs {...{item, cmd, opt}}/>
        );
      }}
    />
  );
}

