import {List} from 'media/stacks/list';
import {EntryHfs} from 'media/dir/stacks/entry-hfs';
import type {HfsCtx} from 'media/dir/types/hfs';

export function DirHfs({hfs, cmd, ext, bar}: HfsCtx) {
  const {list, path} = hfs;
  const {dnd, sel, tmp} = ext;
  return (
    <List
      {...{path, list, ext, bar}}
      render={({item, index}) => {
        const self = path ? `${path}/${item.name}` : item.name;
        const prev = list[index - 1];
        const next = list[index + 1];
        const opt = {
          dragging: dnd?.includes(self),
          selected: {
            self: sel?.includes(self),
            prev: sel?.includes(path ? `${path}/${prev?.name}` : prev?.name),
            next: sel?.includes(path ? `${path}/${next?.name}` : next?.name),
            count: sel?.length,
          },
        };
        return (
          <EntryHfs {...{item, cmd, opt, tmp}}/>
        );
      }}
    />
  );
}

