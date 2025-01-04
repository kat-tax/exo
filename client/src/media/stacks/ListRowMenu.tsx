import * as Menu from 'app/stacks/ContextMenu';
import {useLingui} from '@lingui/react/macro';
import {useStyles} from 'react-native-unistyles';
import {Icon} from 'react-exo/icon';

interface ListRowMenuProps extends React.PropsWithChildren {
  label: string,
}

export function ListRowMenu(props: ListRowMenuProps) {
  const {theme} = useStyles();
  const {t} = useLingui();

  return (
    <Menu.Root>
      <Menu.Trigger>
        {props.children}
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Label key="label">
          {props.label}
        </Menu.Label>
        <Menu.Item key="view">
          <Menu.ItemIcon>
            <Icon name="ph:eye" size={14} color={theme.colors.primary}/>
          </Menu.ItemIcon>
          <Menu.ItemTitle>{t`View`}</Menu.ItemTitle>
          <Menu.ItemSubtitle>ENTER</Menu.ItemSubtitle>
        </Menu.Item>
        <Menu.Item key="share">
          <Menu.ItemIcon>
            <Icon name="ph:share" size={14} color={theme.colors.primary}/>
          </Menu.ItemIcon>
          <Menu.ItemTitle>{t`Share`}</Menu.ItemTitle>
          <Menu.ItemSubtitle>⌘+B</Menu.ItemSubtitle>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item key="copy">
          <Menu.ItemIcon>
            <Icon name="ph:copy" size={14} color={theme.colors.primary}/>
          </Menu.ItemIcon>
          <Menu.ItemTitle>{t`Copy`}</Menu.ItemTitle>
          <Menu.ItemSubtitle>⌘+C</Menu.ItemSubtitle>
        </Menu.Item>
        <Menu.Item key="move">
          <Menu.ItemIcon>
            <Icon name="ph:arrow-elbow-down-right" size={14} color={theme.colors.primary}/>
          </Menu.ItemIcon>
          <Menu.ItemTitle>{t`Move`}</Menu.ItemTitle>
          <Menu.ItemSubtitle>⌘+D</Menu.ItemSubtitle>
        </Menu.Item>
        <Menu.Item key="rename">
          <Menu.ItemIcon>
            <Icon name="ph:textbox" size={14} color={theme.colors.primary}/>
          </Menu.ItemIcon>
          <Menu.ItemTitle>{t`Rename`}</Menu.ItemTitle>
          <Menu.ItemSubtitle>F2</Menu.ItemSubtitle>
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item key="delete">
          <Menu.ItemIcon>
            <Icon name="ph:trash" size={14} color={theme.colors.primary}/>
          </Menu.ItemIcon>
          <Menu.ItemTitle>{t`Delete`}</Menu.ItemTitle>
          <Menu.ItemSubtitle>⌘+DEL</Menu.ItemSubtitle>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  )
}
