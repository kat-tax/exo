import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {MenuContext} from 'app/stacks/float';

import type {useEntryTorrent} from 'media/dir/hooks/use-entry-torrent';
import type {TorrentFileEntry} from 'media/dir/types/torrent';

export interface MenuTorrentProps extends React.PropsWithChildren {
  item: TorrentFileEntry,
  cmd: ReturnType<typeof useEntryTorrent>['cmd'],
  on?: (open: boolean) => void,
}

export function MenuTorrent(props: MenuTorrentProps) {
  const {item, cmd, on} = props;
  const {t} = useLingui();

  return (
    <MenuContext label={item.name} onOpenChange={on} items={useMemo(() => [
      {
        name: 'download',
        icon: 'ph:download',
        label: t`Download`,
        shortcut: '⌘+S',
        action: cmd.download,
      },
    ], [t, cmd])}>
      {props.children}
    </MenuContext>
  );
}
