import {Icon} from 'react-exo/icon';
import {useLingui} from '@lingui/react/macro';
import type {MenuItemList} from './menu-item';

export function useLinkData() {
  const {t} = useLingui();

  const links: MenuItemList = {
    HomeDashboard: {
      label: t`Dashboard`,
      path: '',
      icon: <Icon name="ph:squares-four"/>,
    },
    HomeShortcut: {
      label: t`Shortcut`,
      path: 'shortcut/:id',
    },
    NotFound: {
      label: t`Not Found`,
      path: '*',
    },
    Settings: {
      label: t`Settings`,
      path: 'settings',
      icon: <Icon name="ph:gear"/>,
    },
    TasksListAll: {
      label: t`Lists`,
      path: 'lists',
      icon: <Icon name="ph:list-checks"/>,
    },
    TasksListDetails: {
      label: t`Details`,
      path: 'list/:id',
      icon: <Icon name="ph:list-checks"/>,
    },
    TasksListEdit: {
      label: t`Edit`,
      path: 'list/:id/edit',
      icon: <Icon name="ph:list-checks"/>,
    },
    DevDesign: {
      label: t`Design`,
      path: 'design',
      icon: <Icon name="ph:palette"/>,
    },
    DevCharts: {
      label: t`Charts`,
      path: 'charts',
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
