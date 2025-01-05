import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {ContextMenu} from 'app/stacks/ContextMenu';

import type {ContextMenuItem} from 'app/stacks/ContextMenu';

export interface EntryTorrentMenuProps extends React.PropsWithChildren {
  name: string,
  actions?: {
    menu?: () => void,
    download?: () => void,
  },
}

export function EntryTorrentMenu(props: EntryTorrentMenuProps) {
  const {name, actions} = props;
  const {t} = useLingui();

  const items: Array<ContextMenuItem | undefined> = useMemo(() => [
    actions?.download && {
      name: 'download',
      icon: 'ph:download',
      label: t`Download`,
      shortcut: '⌘+S',
      action: actions?.download,
    },
  ], [t, actions]);

  return (
    <ContextMenu
      label={name}
      items={items}
      onOpenChange={actions?.menu}>
      {props.children}
    </ContextMenu>
  );
}
