import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {MenuContext} from 'app/stacks/float';

import type {TorrentFileEntry} from 'media/dir/types/torrent';
import type {useEntryTorrent} from 'media/dir/hooks/use-entry-torrent';

export interface MenuTorrentProps extends React.PropsWithChildren {
  entry: TorrentFileEntry,
  cmd: ReturnType<typeof useEntryTorrent>['cmd'],
  on?: (open: boolean) => void,
}

export function MenuTorrent(props: MenuTorrentProps) {
  const {entry, cmd, on} = props;
  const {t} = useLingui();
  return (
    <MenuContext label={entry.name} onOpenChange={on} items={useMemo(() => [
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
