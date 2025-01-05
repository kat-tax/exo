import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {ContextMenu} from 'app/stacks/ContextMenu';

import type {ContextMenuItem} from 'app/stacks/ContextMenu';

export interface EntryZipMenuProps extends React.PropsWithChildren {
  name: string,
  actions?: {
    menu?: () => void,
    extract?: () => void,
  },
}

export function EntryZipMenu(props: EntryZipMenuProps) {
  const {name, actions} = props;
  const {t} = useLingui();

  const items: Array<ContextMenuItem | undefined> = useMemo(() => [
    actions?.extract && {
      name: 'extract',
      icon: 'ph:extract',
      label: t`Extract`,
      shortcut: '⌘+S',
      action: actions?.extract,
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
