import {List} from 'media/stacks/list';
import {EntryHfs} from 'media/dir/stacks/entry-hfs';
import type {HfsCtx, HfsOpt} from 'media/dir/types/hfs';
import type {MenuContextItem} from 'app/ui/float/menu-context';

export function DirHfs({hfs, cmd, ext, bar}: HfsCtx) {
  const layout = ext.tmp ? 'grid' : 'list';

  return (
    <List
      items={hfs.list}
      paths={hfs.path?.split('/').map(p => [p, p]) ?? []}
      data={ext}
      opts={{
        layout,
        preview: ext.tmp,
        header: bar ? {actions: bar?.actions} : undefined,
        menu: bar?.actions?.[0]?.items?.filter(Boolean) as MenuContextItem[],
      }}
      render={({item, index}) => {
        const self = hfs.path ? `${hfs.path}/${item.name}` : item.name;
        const prev = hfs.list[index - 1];
        const next = hfs.list[index + 1];
        const opt: Partial<HfsOpt> = {
          layout,
          preview: ext.tmp,
          dragging: ext.dnd.includes(self),
          renaming: ext.rnm.includes(self),
          selected: {
            self: ext.sel.includes(self),
            prev: ext.sel.includes(hfs.path ? `${hfs.path}/${prev?.name}` : prev?.name),
            next: ext.sel.includes(hfs.path ? `${hfs.path}/${next?.name}` : next?.name),
            count: ext.sel.length,
          },
        };
        return (
          <EntryHfs {...{item, cmd, opt}}/>
        );
      }}
    />
  );
}
