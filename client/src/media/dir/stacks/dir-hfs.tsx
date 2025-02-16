import {List} from 'media/stacks/list';
import {EntryHfs} from 'media/dir/stacks/entry-hfs';
import type {HfsCtx, HfsOpt} from 'media/dir/types/hfs';

export function DirHfs({hfs, cmd, ext, bar}: HfsCtx) {
  const {list, path} = hfs;
  const {dnd, sel, tmp} = ext;
  const layout = tmp ? 'grid' : 'list'; // This is default, make user configurable
  return (
    <List
      items={list}
      data={ext}
      opts={{
        layout,
        preview: tmp,
        header: bar ? {path, actions: bar?.actions} : undefined,
      }}
      render={({item, index}) => {
        const self = path ? `${path}/${item.name}` : item.name;
        const prev = list[index - 1];
        const next = list[index + 1];
        const opt: Partial<HfsOpt> = {
          layout,
          preview: tmp,
          dragging: dnd?.includes(self),
          selected: {
            self: sel?.includes(self),
            prev: sel?.includes(path ? `${path}/${prev?.name}` : prev?.name),
            next: sel?.includes(path ? `${path}/${next?.name}` : next?.name),
            count: sel?.length,
          },
        };
        return (
          <EntryHfs {...{item, cmd, opt}}/>
        );
      }}
    />
  );
}

