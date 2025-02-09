import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {MenuContext} from 'app/stacks/float';

import type {TorrentFileEntry} from '../types';
import type {useTorrentEntry} from '../hooks/useTorrentEntry';

export interface TorrentMenuProps extends React.PropsWithChildren {
  entry: TorrentFileEntry,
  cmd: ReturnType<typeof useTorrentEntry>['cmd'],
  on?: (open: boolean) => void,
}

export function TorrentMenu(props: TorrentMenuProps) {
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
