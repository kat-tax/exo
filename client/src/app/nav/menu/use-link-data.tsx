import {Icon} from 'react-exo/icon';
import {useLingui} from '@lingui/react/macro';
import type {MenuItemList} from './menu-item';

export function useLinkData() {
  const {t} = useLingui();

  const links: MenuItemList = {
    HomeDashboard: {
      name: 'HomeDashboard',
      label: t`Dashboard`,
      icon: <Icon name="ph:squares-four"/>,
    },
    HomeShortcut: {
      name: 'HomeShortcut',
      label: t`Shortcut`,
    },
    NotFound: {
      name: 'NotFound',
      label: t`Not Found`,
    },
    Settings: {
      name: 'Settings',
      label: t`Settings`,
      icon: <Icon name="ph:gear"/>,
    },
    TasksListAll: {
      name: 'TasksListAll',
      label: t`Lists`,
      icon: <Icon name="ph:list-checks"/>,
    },
    TasksListDetails: {
      name: 'TasksListDetails',
      label: t`Details`,
      icon: <Icon name="ph:list-checks"/>,
    },
    TasksListEdit: {
      name: 'TasksListEdit',
      label: t`Edit`,
      icon: <Icon name="ph:list-checks"/>,
    },
    DevDesign: {
      name: 'DevDesign',
      label: t`Design`,
      icon: <Icon name="ph:palette"/>,
    },
    DevCharts: {
      name: 'DevCharts',
      label: t`Charts`,
      icon: <Icon name="ph:chart-line"/>,
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
