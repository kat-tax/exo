import {useMemo} from 'react';
import {useStyles} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {Icon} from 'react-exo/icon';

import * as Menu from 'app/stacks/ContextMenu';

export interface ListRowMenuProps extends React.PropsWithChildren {
  name: string,
  path: string,
  events?: ListRowMenuEvents,
}

export interface ListRowMenuEvents {
  menu?: () => void,
  view?: () => void,
  share?: () => void,
  copy?: () => void,
  move?: () => void,
  rename?: () => void,
  delete?: () => void,
}

export function ListRowMenu(props: ListRowMenuProps) {
  const {events} = props;
  const {theme} = useStyles();
  const {t} = useLingui();

  const items = useMemo(() => {
    return [
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
      events?.copy && {
        name: 'copy',
        icon: 'ph:copy',
        label: t`Copy`,
        shortcut: '⌘+C',
        action: events?.copy,
      },
      {
        name: '-',
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
      events?.delete && {
        name: 'delete',
        icon: 'ph:trash',
        label: t`Delete`,
        shortcut: '⌘+DEL',
        action: events?.delete,
      },
    ];
  }, [t, events]);

  return (
    <Menu.Root onOpenChange={events?.menu}>
      <Menu.Trigger>
        {props.children}
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Label key="label">
          {props.name}
        </Menu.Label>
        {items.map(item => item && (
          item.name === '-' ? <Menu.Separator key={item.name} /> : (
          <Menu.Item key={item.name} onSelect={item.action}>
            {item.icon &&
              <Menu.ItemIcon>
                <Icon name={item.icon} size={14} color={theme.colors.primary}/>
              </Menu.ItemIcon>
            }
            <Menu.ItemTitle>{item.label}</Menu.ItemTitle>
            {item.shortcut &&
              <Menu.ItemSubtitle>{item.shortcut}</Menu.ItemSubtitle>
            }
          </Menu.Item>
          )
        )).filter(Boolean)}
      </Menu.Content>
    </Menu.Root>
  )
}
