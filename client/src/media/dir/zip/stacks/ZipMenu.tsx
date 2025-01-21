import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {ContextMenu} from 'app/stacks/ContextMenu';

import type {ZipFileEntry} from '../types';
import type {useZipEntry} from '../hooks/useZipEntry';

export interface ZipMenuProps extends React.PropsWithChildren {
  entry: ZipFileEntry,
  cmd: ReturnType<typeof useZipEntry>['cmd'],
}

export function ZipMenu(props: ZipMenuProps) {
  const {entry, cmd} = props;
  const {t} = useLingui();
  return (
    <ContextMenu label={entry.name} items={useMemo(() => [
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
