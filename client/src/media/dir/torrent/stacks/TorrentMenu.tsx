import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {ContextMenu, type ContextMenuItem} from 'app/stacks/ContextMenu';

export interface TorrentMenuProps extends React.PropsWithChildren {
  name: string,
  actions?: {
    menu?: () => void,
    download?: () => void,
  },
}

export function TorrentMenu(props: TorrentMenuProps) {
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
