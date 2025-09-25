import {Icon} from 'react-exo/icon';
import {useLingui} from '@lingui/react/macro';
import type {MenuItemList} from './menu-item';

export function useLinkData() {
  const {t} = useLingui();

  const links: MenuItemList = {
    HomeDashboard: {
      path: 'HomeDashboard',
      label: t`Dashboard`,
      icon: <Icon name="ph:squares-four"/>,
    },
    TasksListAll: {
      path: 'TasksListAll',
      label: t`Lists`,
      icon: <Icon name="ph:list-checks"/>,
    },
    Settings: {
      path: 'Settings',
      label: t`Settings`,
      icon: <Icon name="ph:gear"/>,
    },
    HomeShortcut: {
      path: 'HomeShortcut',
      label: t`Shortcut`,
      icon: <Icon name="ph:squares-four"/>,
    },
    TasksListDetails: {
      path: 'TasksListDetails',
      label: t`Details`,
      icon: <Icon name="ph:list-checks"/>,
    },
    TasksListEdit: {
      path: 'TasksListEdit',
      label: t`Edit`,
      icon: <Icon name="ph:list-checks"/>,
    },
    DevDesign: {
      path: 'DevDesign',
      label: t`Design`,
      icon: <Icon name="ph:palette"/>,
    },
    DevCharts: {
      path: 'DevCharts',
      label: t`Charts`,
      icon: <Icon name="ph:chart-line"/>,
    },
    NotFound: {
      path: 'NotFound',
      label: t`Not Found`,
      icon: <Icon name="ph:squares-four"/>,
    },
  };

  const config = {
    tabs: [
      links.HomeDashboard,
      links.TasksListAll,
      links.Settings,
    ],
    menuTop: [
      links.HomeDashboard,
      links.TasksListAll,
    ],
    menuDevMenu: [
      links.DevDesign,
      links.DevCharts,
    ],
    menuFooterIcons: [
      links.Settings,
    ],
  } as const;

  return {
    links,
    config,
  };
}
