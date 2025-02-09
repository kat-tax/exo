import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {MenuContext} from 'app/stacks/float';

import type {ZipFileEntry} from 'media/dir/types/zip';
import type {useEntryZip} from 'media/dir/hooks/use-entry-zip';

export interface MenuZipProps extends React.PropsWithChildren {
  entry: ZipFileEntry,
  cmd: ReturnType<typeof useEntryZip>['cmd'],
  on?: (open: boolean) => void,
}

export function MenuZip(props: MenuZipProps) {
  const {entry, cmd, on} = props;
  const {t} = useLingui();
  return (
    <MenuContext label={entry.name} onOpenChange={on} items={useMemo(() => [
      {
        name: 'extract',
        icon: 'ph:extract',
        label: t`Extract`,
        shortcut: '⌘+S',
        action: cmd.extract,
      },
    ], [t, cmd])}>
      {props.children}
    </MenuContext>
  );
}
