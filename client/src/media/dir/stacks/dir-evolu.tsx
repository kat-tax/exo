import {EntryEvolu} from 'media/dir/stacks/entry-evolu';
import {List} from 'media/stacks/list';
import {useQuery} from 'app/data';
import {getDevice, getPathHierarchy} from 'app/data/queries';

import type {DirEvoluCtx, DirEvoluOpt} from 'media/dir/types/evolu';
import type {MenuContextItem} from 'app/ui/float/menu-context';

export function DirEvolu({dir, cmd, ext, bar}: DirEvoluCtx) {
  const [device] = useQuery(getDevice(dir.deviceId));
  const paths = useQuery(getPathHierarchy(dir.path?.deviceId, dir.path?.id));
  const layout = ext.tmp ? 'grid' : 'list';

  return (
    <List
      items={dir.list}
      paths={Array.from(paths).reverse().map(p => [p.name ?? '', p.id.toString()])}
      data={ext}
      opts={{
        layout,
        deviceId: device.id,
        deviceName: device.name,
        preview: ext.tmp,
        header: bar ? {actions: bar?.actions} : undefined,
        menu: bar?.actions?.[0]?.items?.filter(Boolean) as MenuContextItem[],
      }}
      render={({item, index}) => {
        const self = `evolu://${dir.deviceId}/${item.id}`;
        const prev = `evolu://${dir.deviceId}/${dir.list[index - 1]?.id}`;
        const next = `evolu://${dir.deviceId}/${dir.list[index + 1]?.id}`;
        const opt: Partial<DirEvoluOpt> = {
          layout,
          preview: ext.tmp,
          selected: {
            all: ext.sel,
            self: ext.sel.includes(self),
            prev: ext.sel.includes(prev),
            next: ext.sel.includes(next),
            count: ext.sel.length,
          },
        };
        return (
          <EntryEvolu {...{index, item, cmd, opt}}/>
        );
      }}
    />
  );
}

