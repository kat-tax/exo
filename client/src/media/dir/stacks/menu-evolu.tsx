import {useLingui} from '@lingui/react/macro';
import {MenuContext} from 'app/ui/float';

import type {useEntryEvolu} from 'media/dir/hooks/use-entry-evolu';
import type {DirEvoluEntry} from 'media/dir/types/evolu';

export interface MenuEvoluProps extends React.PropsWithChildren {
  item: DirEvoluEntry,
  cmd: ReturnType<typeof useEntryEvolu>['cmd'],
  on?: (open: boolean) => void,
}

export function MenuEvolu(props: MenuEvoluProps) {
  const {item, cmd, on} = props;
  const dir = item.isDirectory;
  const {t} = useLingui();

  return (
    <MenuContext label={item.name} onOpenChange={on} items={[
      dir && {
        name: 'open',
        icon: 'ph:folder-open',
        label: t`Open`,
        shortcut: '⇧+Click',
        action: cmd.open,
      },
      !dir && {
        name: 'download',
        icon: 'ph:download',
        label: t`Download`,
        shortcut: '⌘+D',
        action: cmd.download,
      },
    ]}>
      {props.children}
    </MenuContext>
  );
}
