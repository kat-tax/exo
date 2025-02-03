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
  const dir = entry.isDirectory;
  const {t} = useLingui();

  return (
    <ContextMenu label={entry.name} items={[
      dir && {
        name: 'open',
        icon: 'ph:folder-open',
        label: t`Open`,
        shortcut: '⇧+ENTER',
        action: cmd.open,
      },
      !dir && {
        name: 'share',
        icon: 'ph:share',
        label: t`Share`,
        shortcut: '⌘+K',
        action: cmd.share,
      },
      dir && {
        name: 'compress',
        icon: 'ph:box-arrow-down',
        label: t`Compress`,
        shortcut: '⌘+L',
        action: cmd.compress,
      },
      !dir && {
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
        action: cmd.copy,
      },
      {
        name: 'move',
        icon: 'ph:arrow-elbow-down-right',
        label: t`Move`,
        shortcut: '⌘+X',
        action: cmd.move,
      },
      {
        name: 'rename',
        icon: 'ph:textbox',
        label: t`Rename`,
        shortcut: 'F2',
        action: cmd.rename,
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
    ]}>
      {props.children}
    </ContextMenu>
  );
}
