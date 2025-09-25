import {Icon} from 'react-exo/icon';
import {useLingui} from '@lingui/react/macro';
import type {MenuItemList} from './menu-item';

export function useLinkData() {
  const {t} = useLingui();

  const links: MenuItemList = {
    HomeDashboard: {
      label: t`Dashboard`,
      icon: <Icon name="ph:squares-four"/>,
    },
    HomeShortcut: {
      label: t`Shortcut`,
    },
    NotFound: {
      label: t`Not Found`,
    },
    Settings: {
      label: t`Settings`,
      icon: <Icon name="ph:gear"/>,
    },
    TasksListAll: {
      label: t`Lists`,
      icon: <Icon name="ph:list-checks"/>,
    },
    TasksListDetails: {
      label: t`Details`,
      icon: <Icon name="ph:list-checks"/>,
    },
    TasksListEdit: {
      label: t`Edit`,
      icon: <Icon name="ph:list-checks"/>,
    },
    DevDesign: {
      label: t`Design`,
      icon: <Icon name="ph:palette"/>,
    },
    DevCharts: {
      label: t`Charts`,
      icon: <Icon name="ph:chart-line"/>,
    },
  };

  const config: Record<string, Array<keyof MenuItemList>> = {
    tabs: [
      'HomeDashboard',
      'TasksListAll',
      'Settings',
    ],
    menuTop: [
      'HomeDashboard',
      'TasksListAll',
    ],
    menuDevMenu: [
      'DevDesign',
      'DevCharts',
    ],
    menuFooterIcons: [
      'Settings',
    ],
  } as const;

  return {
    links,
    config,
  };
}
