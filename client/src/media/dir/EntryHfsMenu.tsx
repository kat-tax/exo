import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {ContextMenu} from 'app/stacks/ContextMenu';

import type {ContextMenuItem} from 'app/stacks/ContextMenu';

export interface EntryHfsMenuProps extends React.PropsWithChildren {
  name: string,
  events?: EntryHfsMenuActions,
}

export interface EntryHfsMenuActions {
  menu?: () => void,
  view?: () => void,
  share?: () => void,
  copy?: () => void,
  move?: () => void,
  rename?: () => void,
  delete?: () => void,
}

export function EntryHfsMenu(props: EntryHfsMenuProps) {
  const {name, events} = props;
  const {t} = useLingui();

  const items: Array<ContextMenuItem | undefined> = useMemo(() => [
    events?.view && {
      name: 'view',
      icon: 'ph:eye',
      label: t`View`,
      shortcut: 'ENTER',
      action: events?.view,
    },
    events?.share && {
      name: 'share',
      icon: 'ph:share',
      label: t`Share`,
      shortcut: '⌘+K',
      action: events?.share,
    },
    {
      name: 'middle',
      label: '-',
    },
    events?.copy && {
      name: 'copy',
      icon: 'ph:copy',
      label: t`Copy`,
      shortcut: '⌘+C',
      action: events?.copy,
    },
    events?.move && {
      name: 'move',
      icon: 'ph:arrow-elbow-down-right',
      label: t`Move`,
      shortcut: '⌘+X',
      action: events?.move,
    },
    events?.rename && {
      name: 'rename',
      icon: 'ph:textbox',
      label: t`Rename`,
      shortcut: 'F2',
      action: events?.rename,
    },
    {
      name: 'bottom',
      label: '-',
    },
    events?.delete && {
      name: 'delete',
      icon: 'ph:trash',
      label: t`Delete`,
      shortcut: '⌘+DEL',
      destructive: true,
      action: events?.delete,
    },
  ], [t, events]);

  return (
    <ContextMenu items={items} label={name} onOpenChange={events?.menu}>
      {props.children}
    </ContextMenu>
  )
}
