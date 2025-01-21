import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {ContextMenu} from 'app/stacks/ContextMenu';

import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {useHfsEntry} from '../hooks/useHfsEntry';

export interface HfsMenuProps extends React.PropsWithChildren {
  entry: HfsDirectoryEntry,
  cmd: ReturnType<typeof useHfsEntry>['cmd'],
}

export function HfsMenu(props: HfsMenuProps) {
  const {entry, cmd} = props;
  const {t} = useLingui();
  return (
    <ContextMenu label={entry.name} items={useMemo(() => [
      {
        name: 'view',
        icon: 'ph:eye',
        label: t`View`,
        shortcut: 'ENTER',
        action: cmd.select,
      },
      {
        name: 'share',
        icon: 'ph:share',
        label: t`Share`,
        shortcut: '⌘+K',
        action: () => {}, //cmd.share,
      },
      {
        name: 'download',
        icon: 'ph:download',
        label: t`Download`,
        shortcut: '⌘+D',
        action: cmd.download,
      },
      {
        name: 'middle',
        label: '-',
      },
      {
        name: 'copy',
        icon: 'ph:copy',
        label: t`Copy`,
        shortcut: '⌘+C',
        action: () => {}, //cmd.copy,
      },
      {
        name: 'move',
        icon: 'ph:arrow-elbow-down-right',
        label: t`Move`,
        shortcut: '⌘+X',
        action: () => {}, //cmd.move,
      },
      {
        name: 'rename',
        icon: 'ph:textbox',
        label: t`Rename`,
        shortcut: 'F2',
        action: () => {}, //cmd.rename,
      },
      {
        name: 'bottom',
        label: '-',
      },
      {
        name: 'delete',
        icon: 'ph:trash',
        label: t`Delete`,
        shortcut: '⌘+DEL',
        destructive: true,
        action: cmd.purge,
      },
    ], [t, cmd])}>
      {props.children}
    </ContextMenu>
  );
}
