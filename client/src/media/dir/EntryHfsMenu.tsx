import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {ContextMenu} from 'app/stacks/ContextMenu';

import type {ContextMenuItem} from 'app/stacks/ContextMenu';

export interface EntryHfsMenuProps extends React.PropsWithChildren {
  name: string,
  actions?: {
    menu?: () => void,
    view?: () => void,
    share?: () => void,
    copy?: () => void,
    move?: () => void,
    rename?: () => void,
    delete?: () => void,
  },
}


export function EntryHfsMenu(props: EntryHfsMenuProps) {
  const {name, actions} = props;
  const {t} = useLingui();

  const items: Array<ContextMenuItem | undefined> = useMemo(() => [
    actions?.view && {
      name: 'view',
      icon: 'ph:eye',
      label: t`View`,
      shortcut: 'ENTER',
      action: actions?.view,
    },
    actions?.share && {
      name: 'share',
      icon: 'ph:share',
      label: t`Share`,
      shortcut: '⌘+K',
      action: actions?.share,
    },
    {
      name: 'middle',
      label: '-',
    },
    actions?.copy && {
      name: 'copy',
      icon: 'ph:copy',
      label: t`Copy`,
      shortcut: '⌘+C',
      action: actions?.copy,
    },
    actions?.move && {
      name: 'move',
      icon: 'ph:arrow-elbow-down-right',
      label: t`Move`,
      shortcut: '⌘+X',
      action: actions?.move,
    },
    actions?.rename && {
      name: 'rename',
      icon: 'ph:textbox',
      label: t`Rename`,
      shortcut: 'F2',
      action: actions?.rename,
    },
    {
      name: 'bottom',
      label: '-',
    },
    actions?.delete && {
      name: 'delete',
      icon: 'ph:trash',
      label: t`Delete`,
      shortcut: '⌘+DEL',
      destructive: true,
      action: actions?.delete,
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
