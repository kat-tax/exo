import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {ContextMenu} from 'app/stacks/ContextMenu';

import type {TorrentFileEntry} from '../types';
import type {useTorrentEntry} from '../hooks/useTorrentEntry';

export interface TorrentMenuProps extends React.PropsWithChildren {
  entry: TorrentFileEntry,
  cmd: ReturnType<typeof useTorrentEntry>['cmd'],
}

export function TorrentMenu(props: TorrentMenuProps) {
  const {entry, cmd} = props;
  const {t} = useLingui();
  return (
    <ContextMenu label={entry.name} items={useMemo(() => [
      {
        name: 'download',
        icon: 'ph:download',
        label: t`Download`,
        shortcut: '⌘+S',
        action: cmd.download,
      },
    ], [t, cmd])}>
      {props.children}
    </ContextMenu>
  );
}
