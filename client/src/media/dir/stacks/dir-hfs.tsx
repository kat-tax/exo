import {List} from 'media/stacks/list';
import {EntryHfs} from 'media/dir/stacks/entry-hfs';
import {device} from 'app/data/lib/device';
import type {HfsCtx, HfsOpt} from 'media/dir/types/hfs';
import type {MenuContextItem} from 'app/ui/float/menu-context';

export function DirHfs({dir, cmd, ext, bar}: HfsCtx) {
  const layout = ext.tmp ? 'grid' : 'list';

  return (
    <List
      items={dir.list}
      paths={dir.path?.split('/').filter(Boolean).map(p => [p, p]) ?? []}
      data={ext}
      opts={{
        layout,
        deviceName: device.name,
        preview: ext.tmp,
        header: bar ? {actions: bar?.actions} : undefined,
        menu: bar?.actions?.[0]?.items?.filter(Boolean) as MenuContextItem[],
      }}
      render={({item, index}) => {
        const self = dir.path ? `${dir.path}/${item.name}` : item.name;
        const prev = dir.list[index - 1];
        const next = dir.list[index + 1];
        const opt: Partial<HfsOpt> = {
          layout,
          preview: ext.tmp,
          dragging: ext.dnd.includes(self),
          renaming: ext.rnm.includes(self),
          selected: {
            self: ext.sel.includes(self),
            prev: ext.sel.includes(dir.path ? `${dir.path}/${prev?.name}` : prev?.name),
            next: ext.sel.includes(dir.path ? `${dir.path}/${next?.name}` : next?.name),
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
