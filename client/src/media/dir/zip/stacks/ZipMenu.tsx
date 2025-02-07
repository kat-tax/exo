import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {ContextMenu} from 'app/stacks/ContextMenu';

import type {ZipFileEntry} from '../types';
import type {useZipEntry} from '../hooks/useZipEntry';

export interface ZipMenuProps extends React.PropsWithChildren {
  entry: ZipFileEntry,
  cmd: ReturnType<typeof useZipEntry>['cmd'],
  on?: (open: boolean) => void,
}

export function ZipMenu(props: ZipMenuProps) {
  const {entry, cmd, on} = props;
  const {t} = useLingui();
  return (
    <ContextMenu label={entry.name} onOpenChange={on} items={useMemo(() => [
      {
        name: 'extract',
        icon: 'ph:extract',
        label: t`Extract`,
        shortcut: '⌘+S',
        action: cmd.extract,
      },
    ], [t, cmd])}>
      {props.children}
    </ContextMenu>
  );
}
